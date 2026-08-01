import express from "express";
import multer from "multer";
import { upload, uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// Upload single image with better error handling
router.post("/upload", (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err);
      
      if (err.code === "FILE_TOO_LARGE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Maximum size is 5MB.",
        });
      }
      
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Unexpected field. Please use field name: 'image'",
        });
      }
      
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      console.error("Other error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Upload error",
      });
    }
    next();
  });
}, uploadImage);

export default router;