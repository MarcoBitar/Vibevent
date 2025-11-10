import { uploadImage } from "../utils/uploadImage.js";

export function handleImageUpload(fieldName) {
  return async function (req, res, next) {
    try {
      const base64 = req.body[fieldName];
      if (base64 && base64.startsWith('data:image')) {
        const imageUrl = await uploadImage(base64);
        req.body[fieldName] = imageUrl;
      }
      next();
    } catch (err) {
      console.error(`Image upload failed for ${fieldName}:`, err);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  };
}