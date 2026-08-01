const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload');
const processImage = require('../middleware/imageProcessor');

// Routes - ORDER MATTERS! Place specific routes before generic ones
router.get('/stats', blogController.getStats);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

router.post(
  '/',
  upload.single('image'),
  processImage,
  blogController.createBlog
);

router.put(
  '/:id',
  upload.single('image'),
  processImage,
  blogController.updateBlog
);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;