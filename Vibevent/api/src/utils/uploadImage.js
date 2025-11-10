import axios from 'axios';
import FormData from 'form-data';

const IMG_BB_API = 'https://api.imgbb.com/1/upload';
const API_KEY = process.env.IMGBB_API_KEY;

export async function uploadImage(base64Image) {
  try {
    const formData = new FormData();

    // ✅ Strip the prefix
    const strippedBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
    formData.append('image', strippedBase64);

    const response = await axios.post(`${IMG_BB_API}?key=${API_KEY}`, formData, {
      headers: formData.getHeaders(),
    });

    return response.data.data.url;
  } catch (error) {
    console.error('Image upload failed:', error.response?.data || error.message);
    throw new Error('Failed to upload image');
  }
}