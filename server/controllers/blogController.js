const Blog = require("../models/Blog");

// Helper: safely parse tags
const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
};

// Save or update a blog (as draft or keep it as draft)
exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags, status } = req.body;
    const data = {
      title,
      content,
      tags: parseTags(tags),
      status: status || "draft", //  allow frontend to send draft or fallback to draft
    };

    const blog = id
      ? await Blog.findByIdAndUpdate(id, data, { new: true, upsert: true })
      : await Blog.create(data);

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Publish a new blog or convert draft to published
exports.publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const data = {
      title,
      content,
      tags: parseTags(tags),
      status: "published",
    };

    const blog = id
      ? await Blog.findByIdAndUpdate(id, data, { new: true, upsert: true })
      : await Blog.create(data);

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Edit an existing blog directly by ID
exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, status } = req.body;

    const update = {
      title,
      content,
      tags: parseTags(tags),
    };
    if (status) update.status = status;

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
