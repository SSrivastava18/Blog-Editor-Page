import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/blogs";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setError("Could not load blogs. Check server or API URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    localStorage.setItem("blogToEdit", JSON.stringify(blog));
    navigate("/editor");
  };

  const handleNewBlog = () => {
    localStorage.removeItem("blogToEdit");
    navigate("/editor");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete the blog");
      }
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const drafts = blogs.filter((b) => b.status === "draft");
  const published = blogs.filter((b) => b.status === "published");

  const renderTags = (tags) =>
    tags?.length > 0 && (
      <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map((tag, idx) => (
          <span
            key={idx}
            style={{
              backgroundColor: "#e3f2fd",
              color: "#007BFF",
              padding: "4px 10px",
              borderRadius: "14px",
              fontSize: "0.8em",
              fontWeight: "500"
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    );

  const getPreview = (content, id) => {
    const wordLimit = 50;
    const words = content.split(" ");
    const isExpanded = expandedIds.includes(id);

    if (words.length <= wordLimit || isExpanded) {
      return content;
    }

    return words.slice(0, wordLimit).join(" ") + " ...";
  };

  const renderCard = (b) => {
    const isExpanded = expandedIds.includes(b._id);

    return (
      <div
        key={b._id}
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "default"
        }}
      >
        <h3 style={{ marginBottom: "8px", color: "#222" }}>{b.title}</h3>
        <p style={{ color: "#555", fontSize: "0.95em", whiteSpace: "pre-line" }}>
          {getPreview(b.content, b._id)}
        </p>
        {b.content.split(" ").length > 50 && (
          <button
            onClick={() => toggleExpand(b._id)}
            style={{
              marginTop: "10px",
              padding: "4px 10px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85em"
            }}
          >
            {isExpanded ? "Show Less ▲" : "Read More ▼"}
          </button>
        )}
        <small style={{ display: "block", marginTop: "10px", color: "#888" }}>
          Status: {b.status} • {new Date(b.updatedAt).toLocaleString()}
        </small>
        {renderTags(b.tags)}
        <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
          <button
            onClick={() => handleEdit(b)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "#fff",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => handleDelete(b._id)}
            style={{
              padding: "6px 14px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#DC3545",
              color: "#fff",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <p style={{ padding: "24px" }}>⏳ Loading blogs...</p>;
  if (error) return <p style={{ color: "red", padding: "24px" }}>{error}</p>;

  return (
    <div style={{ padding: "24px", background: "#f5f7fa", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px"
        }}
      >
        <h1 style={{ fontSize: "1.8rem", color: "#333" }}>📚 Blog Dashboard</h1>
        <button
          onClick={handleNewBlog}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "600",
            border: "none",
            cursor: "pointer"
          }}
        >
          ➕ New Blog
        </button>
      </div>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "16px", color: "#222" }}>✅ Published Blogs</h2>
        {published.length === 0 ? (
          <p>No published blogs yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {published.map(renderCard)}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ marginBottom: "16px", color: "#222" }}>📝 Drafts</h2>
        {drafts.length === 0 ? (
          <p>No drafts saved.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {drafts.map(renderCard)}
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogList;
