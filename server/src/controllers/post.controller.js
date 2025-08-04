import jwt from "jsonwebtoken";
import postModel from "../models/post.model.js";
import generateImageCaption from "../service/ai.service.js";

export const createPostController = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }
  const base64ImageFile = Buffer.from(file.buffer).toString("base64");

  const caption = await generateImageCaption(base64ImageFile);

  console.log("Caption generated:", caption);
  res.status(200).json({ caption });
};
