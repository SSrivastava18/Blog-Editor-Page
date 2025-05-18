import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [editingId, setEditingId] = useState(null);
  const [autosaveMessage, setAutosaveMessage] = useState("");

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/blogs";

  const lastSavedData = useRef({ title: "", content: "", tags: "" });

  useEffect(() => {
    const stored = localStorage.getItem("blogToEdit");
    if (stored) {
      const blog = JSON.parse(stored);
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setTags(blog.tags?.join(", ") || "");
      setStatus(blog.status || "draft");
      setEditingId(blog._id);
      lastSavedData.current = {
        title: blog.title || "",
        content: blog.content || "",
        tags: blog.tags?.join(", ") || ""
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const trimmedTags = tags.trim();

      // Only autosave if content is non-empty and something changed
      if (
        content.trim() &&
        (
          title !== lastSavedData.current.title ||
          content !== lastSavedData.current.content ||
          trimmedTags !== lastSavedData.current.tags
        )
      ) {
        autosaveDraft();
      }
    }, 10000); // every 10 seconds

    return () => clearInterval(interval); // clean up
  }, [title, content, tags]);

  const autosaveDraft = async () => {
    const payload = {
      id: editingId,
      title,
      content,
      tags,
      status: "draft",
    };

    if (!content.trim()) return;

    try {
      await axios.post(`${API_URL}/save`, payload);
      lastSavedData.current = { title, content, tags: tags.trim() };
      setAutosaveMessage("✅ Draft autosaved");

      setTimeout(() => setAutosaveMessage(""), 3000);
    } catch (err) {
      console.error("Autosave failed:", err.response?.data || err.message);
      setAutosaveMessage("⚠️ Autosave failed");
      setTimeout(() => setAutosaveMessage(""), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: editingId,
      title,
      content,
      tags,
      status,
    };

    try {
      if (status === "draft") {
        await axios.post(`${API_URL}/save`, payload);
      } else {
        await axios.post(`${API_URL}/publish`, payload);
      }
      localStorage.removeItem("blogToEdit");
      navigate("/");
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Failed to save blog.");
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>
        {editingId ? "✏️ Edit Blog" : "📝 Create New Blog"}
      </h2>

      {autosaveMessage && (
        <div style={{
          backgroundColor: autosaveMessage.includes("failed") ? "#ffe0e0" : "#e0f7fa",
          color: autosaveMessage.includes("failed") ? "#d32f2f" : "#007BFF",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          fontWeight: "bold"
        }}>
          {autosaveMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
          style={{ padding: "10px", fontSize: "1em", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
          rows="10"
          required
          style={{ padding: "10px", fontSize: "1em", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          style={{ padding: "10px", fontSize: "1em", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: "10px", fontSize: "1em", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="draft">Save as Draft</option>
          <option value="published">Publish</option>
        </select>
        <button
          type="submit"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            padding: "10px 16px",
            fontSize: "1em",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogEditor;
