import express from "express";
import {nanoid} from "nanoid";
import { eq } from "drizzle-orm";

import db from "../db/index.js";
import { urlsTable } from "../models/urls.model.js";


import { urlPostRequestSchema } from "../validation/request.validation.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addUrl,getUrlByShortCode,deleteUrlByShortCode, getUrlByUserId} from "../services/url.service.js";


const router = express.Router();

router.post("/shorten",isAuthenticated,async(req,res)=>{
    const user = req.user;
    const validationResult = await urlPostRequestSchema.safeParseAsync(req.body);
    if(validationResult.error){
        return res.status(400).json({ message: validationResult.error.message });
    }

    const { targetUrl,code } = validationResult.data;
    console.log(code);
    const shortCode = code? code: nanoid(6);
    const [urldata] = await addUrl(shortCode, targetUrl, user.id);
    res.status(201).json({ status: "success", data: urldata });
});

router.get("/codes",isAuthenticated,async(req,res)=>{
    const user = req.user;
    try{
        const userUrl = await getUrlByUserId(user.id);
        return res.status(200).json({ status: "success", data: userUrl });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:shortCode", isAuthenticated, async (req, res) => {
    const user = req.user;
    const code = req.params.shortCode;
    try{
        const deletedCodes = await deleteUrlByShortCode(code, user.id);
        if(!deletedCodes){
            return res.status(404).json({ message: "URL not found" });
        }
        
        return res.status(200).json({ status: "success", data: deletedCodes });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:shortCode", async (req, res) => {
    const code = req.params.shortCode;
    try{
        const [urlData] = await getUrlByShortCode(code);
        if (!urlData) {
            return res.status(404).json({ message: "Invalid URL" });
        }
        return res.redirect(urlData.targetUrl);
        // return res.status(200).json({ status: "success", data: urlData.targetUrl });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;