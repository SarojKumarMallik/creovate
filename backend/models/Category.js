import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minlength: [2, "Category name must be at least 2 characters"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      // Removed required: true - it will be auto-generated
    },
    description: {
      type: String,
      trim: true,
      default: "", // Set default empty string
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    parentCategory: {
      type: String,
      default: "None",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from name before saving
CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  }
  next();
});

// Handle update operations
CategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = update.name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  }
  next();
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;