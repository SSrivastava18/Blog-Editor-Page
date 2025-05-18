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

      {/* Optional: Navigation buttons */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/editor" style={{ marginRight: "10px" }}>➕ New Blog</Link>
        <Link to="/">📃 Blog List</Link>
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
