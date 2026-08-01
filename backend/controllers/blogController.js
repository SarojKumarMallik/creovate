const Blog = require('../models/Blog');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

// Helper function to generate unique slug
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });
  
  // Ensure slug is not empty
  if (!slug) {
    slug = 'blog-' + Date.now();
  }

  // Check if slug exists
  let existingBlog = await Blog.findOne({ slug });
  let counter = 1;
  const baseSlug = slug;

  while (existingBlog) {
    slug = `${baseSlug}-${counter}`;
    existingBlog = await Blog.findOne({ slug });
    counter++;
  }

  return slug;
};

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Public
exports.createBlog = async (req, res) => {
  try {
    const { title, category, content, metaTitle, metaKeywords, metaDescription, status } = req.body;

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and content are required fields',
      });
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(title);

    // Prepare image URL
    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const blogData = {
      title: title.trim(),
      slug,
      category: category.trim(),
      content,
      metaTitle: metaTitle ? metaTitle.trim() : title.trim(),
      metaKeywords: metaKeywords ? metaKeywords.trim() : '',
      metaDescription: metaDescription ? metaDescription.trim() : content.substring(0, 160),
      status: status || 'draft',
      image: imageUrl,
    };

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this slug already exists',
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create blog',
    });
  }
};

// @desc    Get all blogs with pagination
// @route   GET /api/blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'all' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build filter
    const filter = {};
    if (status !== 'all') {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Blog.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
    });
  }
};

// @desc    Get single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
  try {
    // Validate ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID format',
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
    });
  }
};

// @desc    Get blog by slug
// @route   GET /api/blogs/slug/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog',
    });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Public
exports.updateBlog = async (req, res) => {
  try {
    // Validate ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID format',
      });
    }

    const { title, category, content, metaTitle, metaKeywords, metaDescription, status } = req.body;

    // Find blog
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Prepare update data
    const updateData = {
      title: title ? title.trim() : blog.title,
      category: category ? category.trim() : blog.category,
      content: content || blog.content,
      metaTitle: metaTitle ? metaTitle.trim() : blog.metaTitle,
      metaKeywords: metaKeywords ? metaKeywords.trim() : blog.metaKeywords,
      metaDescription: metaDescription ? metaDescription.trim() : blog.metaDescription,
      status: status || blog.status,
    };

    // Update slug if title changed
    if (title && title.trim() !== blog.title) {
      updateData.slug = await generateUniqueSlug(title.trim());
    }

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image if exists
      if (blog.image) {
        const oldImagePath = path.join(__dirname, '..', blog.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog with this slug already exists',
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update blog',
    });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Public
exports.deleteBlog = async (req, res) => {
  try {
    // Validate ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid blog ID format',
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Delete image file if exists
    if (blog.image) {
      const imagePath = path.join(__dirname, '..', blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog',
    });
  }
};

// @desc    Get blog statistics
// @route   GET /api/blogs/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const [total, published, drafts] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'draft' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        published,
        drafts,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
};