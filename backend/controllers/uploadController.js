import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/blogs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `blog-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, WebP, GIF, and SVG are allowed."), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});

// Upload image and convert to WebP
export const uploadImage = async (req, res) => {
  try {
    console.log("Upload request received");
    console.log("File:", req.file);
    
    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({
        success: false,
        message: "No image file provided. Please use field name: 'image'",
      });
    }

    console.log("File received:", req.file.path);
    console.log("File original name:", req.file.originalname);
    console.log("File size:", req.file.size);

    const filePath = req.file.path;
    const outputPath = filePath.replace(/\.[^.]+$/, ".webp");

    // Convert to WebP using sharp
    await sharp(filePath)
      .resize(1200, 800, {
        fit: "cover",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 4,
      })
      .toFile(outputPath);

    // Remove original file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Generate URL
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    const imageUrl = `${baseUrl}/uploads/blogs/${path.basename(outputPath)}`;

    console.log("Image uploaded successfully:", imageUrl);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: imageUrl,
        filename: path.basename(outputPath),
      },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

export { upload };