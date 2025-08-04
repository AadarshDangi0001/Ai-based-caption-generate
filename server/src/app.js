import express from "express";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes);


export default app;