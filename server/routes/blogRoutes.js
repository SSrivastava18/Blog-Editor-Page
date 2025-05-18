const express = require("express");
const {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Save or update a draft (status should be passed in payload)
router.post("/save", saveDraft);

// Publish a new blog or convert draft to published
router.post("/publish", publishBlog);

// Get all blogs
router.get("/", getAllBlogs);

// Get a single blog by ID
router.get("/:id", getBlogById);

// Delete blog by ID
router.delete("/delete/:id", deleteBlog);

module.exports = router;
