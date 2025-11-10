import express from "express";
import { uploadImage } from "../utils/uploadImage.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    if (!/^data:image\/[a-z]+;base64,/.test(image)) {
      return res.status(400).json({ error: "Invalid image format" });
    }
    
    const imageUrl = await uploadImage(image);
    res.json({ image: imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;