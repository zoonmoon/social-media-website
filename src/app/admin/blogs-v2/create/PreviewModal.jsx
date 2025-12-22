"use client";
import React, { useState, useEffect } from "react";

export default function PreviewModal({id, blocks, html, title, meta_title, thumbnail, meta_description, onClose }) {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("editing"); 

  // editing | sending | success
  const [successInfo, setSuccessInfo] = useState({
    message: ""
  });

  // LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);
  
const handleSend = async () => {
  if (!title?.trim()) {
    alert("Title is required!");
    return;
  }

  if (!confirm("Are you sure you want to publish this blog?")) return;

  setStatus("sending");

  try {
    const isUpdate = Boolean(id);

    const res = await fetch("/api/admin/blogs-v2", {
      method: isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: isUpdate ? id : undefined,
        title,
        meta_title,
        meta_description,
        thumbnail,
        html,
        blocks,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      console.error(data);
      alert(data.msg || "Error publishing blog");
      setStatus("editing");
      return;
    }

    setSuccessInfo({
      message: data.message || "Success",
    });

    setStatus("success");

  } catch (err) {
    console.error(err);
    alert("Network error publishing blog.");
    setStatus("editing");
  }
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        {/* ----------------------------------------------------- */}
        {/*  SUCCESS SCREEN */}
        {/* ----------------------------------------------------- */}
{status === "success" && (
  <div className="success-wrapper">
    <div className="success-icon">✓</div>
    <h2>Blog published Successfully!</h2>
    <button className="modal-close-btn" onClick={() => window.location.reload()}>
      Close
    </button>
  </div>
)}

 
        {/* ----------------------------------------------------- */}
        {/*  SENDING STATE */}
        {/* ----------------------------------------------------- */}
        {status === "sending" && (
          <div className="sending-wrapper">
            <div className="loader"></div>
            <h3>Publishing...</h3>
          </div>
        )}

        {/* ----------------------------------------------------- */}
        {/* EDITING / PREVIEW MODE */}
        {/* ----------------------------------------------------- */}
        {status === "editing" && (
          <>
            <h2>Blog Preview</h2>
            <div
              className="modal-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="modal-bottom-bar">
              <button className="modal-confirm-btn" onClick={handleSend}>
                Continue
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
