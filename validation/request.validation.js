import z from "zod";
export const signupPostRequestSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    username: z.string().min(2, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const loginPostRequestSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

export const urlPostRequestSchema = z.object({
    targetUrl: z.string().url("Invalid URL format"),
    code: z.string().min(3, "Custom code must be at least 3 characters long").optional()
});