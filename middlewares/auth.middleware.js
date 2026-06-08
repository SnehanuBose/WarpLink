import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/token.util.js";


export const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next();
    }
    if(!authHeader.startsWith("Bearer")){
        return res.status(401).json("Invalid Token Format");
    }

    const token = authHeader.split(" ")[1];
    const data = verifyToken(token);
    if (!data) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    req.user=data;
    next();
}


export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};