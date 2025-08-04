import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateImageCaption(base64ImageFile) {

const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
    systemInstruction: `
    You are a helpful assistant that generates captions for images. 
    Provide a concise and descriptive caption based on the content of the image
    you use hash tags and emojis to enhance the caption.
    you generate a single caption for the image.`,
  }
});
return response.text;
}


export default generateImageCaption;