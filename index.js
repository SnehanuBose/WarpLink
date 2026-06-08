import express from 'express';
import dotenv from 'dotenv/config';

import userRoutes from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();



const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(authenticationMiddleware);

app.use("/", urlRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

