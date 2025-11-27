"use client";
import React, { useState, useEffect } from "react";

export default function PreviewModal({ html, onClose }) {
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("editing"); 
  // editing | sending | success
const [successInfo, setSuccessInfo] = useState({
  total_users: 0,
  message: ""
});

  // LOCK BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

const handleSend = async () => {
  if (!subject.trim()) {
    alert("Subject is required!");
    return;
  }

  if (!confirm("Are you sure you want to send this email?")) return;

  setStatus("sending");

  try {
    const res = await fetch("/api/admin/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, html }),
    });

    const data = await res.json();

    if (!data.success) {
      console.error(data);
      alert("Error: " + data.msg);
      setStatus("editing");
      return;
    }

    // STORE DETAILS TO DISPLAY
    setSuccessInfo({
      total_users: data.total_users || 0,
      message: data.message || "Success"
    });

    setStatus("success");

  } catch (err) {
    console.error(err);
    alert("Network error sending emails.");
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
    <h2>Email Sent Successfully!</h2>
    <p><strong>Delivered to {successInfo.total_users} users.</strong></p>

    <button className="modal-close-btn" onClick={onClose}>
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
            <h3>Sending email...</h3>
          </div>
        )}

        {/* ----------------------------------------------------- */}
        {/* EDITING / PREVIEW MODE */}
        {/* ----------------------------------------------------- */}
        {status === "editing" && (
          <>
            <h2>Email Preview</h2>

            <label className="modal-label">Email Subject *</label>
            <input
              className="modal-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject..."
            />

            <div
                
              className="modal-preview"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            <div className="modal-bottom-bar">
              <button className="modal-confirm-btn" onClick={handleSend}>
                Confirm Send
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
