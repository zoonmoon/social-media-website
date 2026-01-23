'use client'
import { useState, useEffect } from "react";
import AddBlockPopup from "./AddBlockPopup";
import TextBlock from "./TextBlock";
import RichTextBlock from "./RichTextBlock";
import ImageBlock from "./ImageBlock";
import PreviewModal from "./PreviewModal";

export default function EmailComposer() {

  // ---------------------------------------------------------
  // MASTER SAVE FUNCTION — SAVES TO CACHE 100% OF THE TIME
  // ---------------------------------------------------------
  const save = (updatedBlocks) => {
    setBlocks(updatedBlocks);             // update state
    localStorage.setItem("email_composer_blocks", JSON.stringify(updatedBlocks));  
  };

  // ---------------------------------------------------------
  // LOAD FROM CACHE ONCE
  // ---------------------------------------------------------
  const [blocks, setBlocks] = useState([]);
const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("email_composer_blocks");
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // ---------------------------------------------------------
  // ADD BLOCK
  // ---------------------------------------------------------
  const addBlock = (type) => {


    const updated = [
      ...blocks,
      { id: crypto.randomUUID(), type, content: "" }
    ];
    save(updated);
    setShowPopup(false);


      setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, 150);




  };

  // ---------------------------------------------------------
  // UPDATE A BLOCK
  // ---------------------------------------------------------
  const updateBlock = (id, content) => {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, content } : b
    );
    save(updated);
  };

  // ---------------------------------------------------------
  // DELETE A BLOCK
  // ---------------------------------------------------------
  const deleteBlock = (id) => {
    const updated = blocks.filter((b) => b.id !== id);
    save(updated);
  };

  // ---------------------------------------------------------
  // MOVE BLOCKS
  // ---------------------------------------------------------
  const moveBlock = (i, dir) => {
    const arr = [...blocks];
    const t = i + dir;
    if (t < 0 || t >= arr.length) return;

    [arr[i], arr[t]] = [arr[t], arr[i]];
    save(arr);
  };

  const [showPopup, setShowPopup] = useState(false);

const generateHTML = () => {
  const content = blocks
    .map((b) => {
      if (b.type === "text") return `<p>${b.content}</p>`;
      if (b.type === "richtext") return b.content;
      if (b.type === "image")
        return `<img width="400" style="width:90%;max-width:400px;height:auto" src="${b.content}" />`;
      return "";
    })
    .join("\n");

  const unsubscribeHTML = `
    <hr style="margin:30px 0;" />
    <p style="font-size:12px;color:#666;text-align:center;">
      Don’t want to receive these emails?
      <br />
      <a href="https://yourarton.com/settings/notifications" target="_blank">
        Unsubscribe or manage your email preferences
      </a>
    </p>
  `;

  return content + "\n" + unsubscribeHTML;
};

  
  return (
    <div className="email-composer">

      {/* FIXED BOTTOM BAR */}
      <div className="composer-bottom-bar">
        <button className="bottom-btn" onClick={() => setShowPopup(true)}>
          + Add Component
        </button>

        <div className="bottom-divider"></div>

<button
  className="bottom-btn preview-btn"
  onClick={() => {
    setShowPreview(true);
  }}
>
  Preview Email
</button>


      </div>


{showPreview && (
  <PreviewModal
    html={generateHTML()}
    onClose={() => setShowPreview(false)}
    onConfirm={(subject) => {
      alert("The email will be sent to all the users.\nSubject: " + subject);
      setShowPreview(false);
    }}
  />
)}


      {/* LEFT SIDE — EDITOR */}
      <div className="composer-panel">
        <h2>Email Composer</h2>

        {blocks.map((block, i) => (
          <div key={block.id} className="block-item">

            {block.type === "text" && (
              <TextBlock 
                id={block.id}
                content={block.content}
                onChange={updateBlock}
              />
            )}

            {block.type === "richtext" && (
              <RichTextBlock 
                id={block.id}
                content={block.content}
                onChange={updateBlock}
              />
            )}

            {block.type === "image" && (
              <ImageBlock 
                id={block.id}
                content={block.content}
                onChange={updateBlock}
              />
            )}

            <div className="block-actions">
              <button className="block-btn" onClick={() => moveBlock(i, -1)}>↑</button>
              <button className="block-btn" onClick={() => moveBlock(i, 1)}>↓</button>
              <button className="block-btn delete" onClick={() => deleteBlock(block.id)}>
                Delete
              </button>
            </div>

          </div>
        ))}

        {showPopup && (
          <AddBlockPopup 
            onSelect={addBlock}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>

      {/* RIGHT PREVIEW FIXED */}
      <div className="preview-panel-fixed">
        <h2>Preview</h2>

        <div className="preview-content-fixed">
          {blocks.map((b) => (
            <div key={b.id} className="preview-block">
              {b.type === "text" && <p>{b.content}</p>}
              {b.type === "richtext" && (
                <div dangerouslySetInnerHTML={{ __html: b.content }} />
              )}
              {b.type === "image" && (
                <img src={b.content} className="image-preview" alt="" />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
