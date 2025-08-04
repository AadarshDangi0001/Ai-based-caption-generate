import express from "express";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createPostController } from "../controllers/post.controller.js";

const router = express.Router();
const upload = multer(); // Use memory storage for buffer access

router.post('/', authMiddleware, upload.single('image'), createPostController);

export default router;