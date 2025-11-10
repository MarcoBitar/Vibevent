import { useState, useCallback } from "react";

// useImageConverter handles image file input and converts it to base64
export function useImageConverter() {
  // === State ===
  const [base64, setBase64] = useState(null);     // base64-encoded image string
  const [loading, setLoading] = useState(false);  // conversion in progress
  const [error, setError] = useState(null);       // error message (if any)

  // === File Input Handler ===
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();

    // === On successful read ===
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string" && /^data:image\/[a-z]+;base64,/.test(result)) {
        setBase64(result); // valid base64 image
      } else {
        setError("Invalid image format");
        setBase64(null);
      }
      setLoading(false);
    };

    // === On read error ===
    reader.onerror = () => {
      setError("Failed to read image");
      setLoading(false);
      setBase64(null);
    };

    reader.readAsDataURL(file); // trigger base64 conversion
  }, []);

  // === Reset state ===
  const reset = useCallback(() => {
    setBase64(null);
    setError(null);
  }, []);

  // === Hook API ===
  return { base64, loading, error, handleFileChange, reset };
}