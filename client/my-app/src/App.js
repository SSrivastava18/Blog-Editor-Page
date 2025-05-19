import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BlogEditor from "./components/BlogEditor";
import BlogList from "./components/BlogList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Blog Editor</h1>

      <nav style={{ marginBottom: "30px", display: "flex", gap: "12px" }}>
  {/* <Link
    to="/editor"
    style={{
      textDecoration: "none",
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1em",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "background-color 0.2s ease"
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
  >
    ➕ New Blog
  </Link> */}

  <Link
    to="/"
    style={{
      textDecoration: "none",
      backgroundColor: "#007bff",
      color: "white",
      padding: "10px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1em",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "background-color 0.2s ease"
    }}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0069d9")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
  >
    📃 Blog List
  </Link>
</nav>


      {/* App Routes */}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/editor" element={<BlogEditor />} />
        <Route path="/editor/:id" element={<BlogEditor />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}
