import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.error(error);
    }
};