import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryStats,
} from "../controllers/categoryController.js";

const router = express.Router();

// Get category statistics
router.get("/stats", getCategoryStats);

// Get all categories with pagination and filters
router.get("/", getCategories);

// Get single category
router.get("/:id", getCategoryById);

// Create new category
router.post("/", createCategory);

// Update category
router.put("/:id", updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

export default router;