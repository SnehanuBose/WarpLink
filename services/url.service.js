import { and, eq } from "drizzle-orm";

import db from "../db/index.js";
import { urlsTable } from "../models/urls.model.js";


export const addUrl = async (shortCode, targetUrl, userId) => {
    try {
        const newUrl = await db.insert(urlsTable).values({
            shortCode,
            targetUrl,
            userId
        }).returning({shortCode: urlsTable.shortCode, targetUrl: urlsTable.targetUrl,userId: urlsTable.userId});
        return newUrl;
    }catch (error) {
        console.error("Error adding URL:", error);
    }
};

export const getUrlByShortCode = async (shortCode) => {
    try {
        const urlData = await db.select({targetUrl: urlsTable.targetUrl}).from(urlsTable).where(eq(urlsTable.shortCode, shortCode)); 
        return urlData;
    } catch (error) {
        console.error(error);
    }
};

export const deleteUrlByShortCode = async (shortCode, userId) => {
    try {
        const [deleteCount] = await db.delete(urlsTable)
        .where(and(eq(urlsTable.shortCode, shortCode), eq(urlsTable.userId, userId)))
        .returning({shortCode: urlsTable.shortCode, targetUrl: urlsTable.targetUrl,userId: urlsTable.userId});
        return deleteCount;
    } catch (error) {
        console.error(error);
    }   
};

export const getUrlByUserId = async(userId)=>{
    try {
        const urlData = await db.select().from(urlsTable).where(eq(urlsTable.userId, userId)); 
        return urlData;
    } catch (error) {
        console.error(error);
    }
}
