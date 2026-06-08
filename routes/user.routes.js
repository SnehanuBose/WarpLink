import express from "express";
import { eq } from "drizzle-orm";


import db from "../db/index.js";
import {usersTable} from "../models/user.model.js";
import { generateToken } from "../utils/token.util.js";
import { generateHash, compareHash } from "../utils/hashgenerator.util.js";
import {signupPostRequestSchema,loginPostRequestSchema} from "../validation/request.validation.js";
import { getUserbyemail,createUser } from "../services/user.services.js";

const router = express.Router();

router.get("/me",(req,res)=>{
    const userData = req.user;
    return res.status(200).json(userData)
})

router.post("/signup", async (req, res) => {

    const validationResult = await signupPostRequestSchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({ message: validationResult.error.message }); 
    }
    const { firstname, lastname, username, email, password } = validationResult.data;   

    try {

        if(await getUserbyemail(email)){
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPassword = await generateHash(password);

        const newUser = await createUser({ firstname, lastname, username, email, hashedPassword });
        return res.status(201).json({ message: `User ${newUser.username} created successfully` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    const validationResult = await loginPostRequestSchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({ message: validationResult.error.message }); 
    }
    const { email, password } = validationResult.data;
    try{
        const user = await getUserbyemail(email);
        if(!user){
            return res.status(400).json({ message: "Email not registered" });
        }
        const isPasswordValid = await compareHash(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user);
        return res.status(200).json({status:"success", token });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;