import db from "../db/index.js";
import { usersTable } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const getUserbyemail = async (email) => {
    try {
        const [user] = await db.select({
            id: usersTable.id,
            firstname: usersTable.firstname,
            lastname: usersTable.lastname,
            username: usersTable.username,
            email: usersTable.email,
            password: usersTable.password
        }).from(usersTable).where(eq(usersTable.email, email)).limit(1);    
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (userData) => {
    const { firstname, lastname, username, email, hashedPassword } = userData;
    try {
        const [newUser] = await db.insert(usersTable).values({
            firstname,
            lastname,
            username,
            email,
            password:hashedPassword
        }).returning({username: usersTable.username});
        return newUser;
    } catch (error) {
        console.error(error);
    }
}

