'use client'
import { useState, useEffect } from "react";
import AddBlockPopup from "./AddBlockPopup";
import TextBlock from "./TextBlock";
import RichTextBlock from "./RichTextBlock";
import ImageBlock from "./ImageBlock";
import PreviewModal from "./PreviewModal";
import { Divider } from "@mui/material";

export  function BlogComposer({ blocks: b = [], id: i = '', title: t = '', thumbnail: th = '', meta_title: mt = '', meta_description: md = '' }) {

  // =========================================================
  // ✅ FOUR SEPARATE STATES (NOT BLOCKS)
  // =========================================================
  const [title, setTitle] = useState(t);
  const [thumbnail, setThumbnail] = useState(th);
  const [metaTitle, setMetaTitle] = useState(mt);
  const [metaDescription, setMetaDescription] = useState(md);

  // 👇 THIS FIXES YOUR PREVIEW CRASH
  
  // =========================================================
  // BLOCK SYSTEM — UNCHANGED
  // =========================================================
  const [blocks, setBlocks] = useState(b);
  const [showPreview, setShowPreview] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const save = (updatedBlocks) => {
    setBlocks(updatedBlocks);
    // localStorage.setItem("blog_composer_blocks", JSON.stringify(updatedBlocks));
  };



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

  const updateBlock = (id, content) => {
    save(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const deleteBlock = (id) => {
    save(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (i, dir) => {
    const arr = [...blocks];
    const t = i + dir;
    if (t < 0 || t >= arr.length) return;
    [arr[i], arr[t]] = [arr[t], arr[i]];
    save(arr);
  };

  const generateHTML = () => {
    return blocks
      .map((b) => {
        if (b.type === "text") return `<p>${b.content}</p>`;
        if (b.type === "richtext") return b.content;
        if (b.type === "image")
          return `<div><img style="width:90%;max-width:640px;height:auto" src="${b.content}" /></div>`;
        return "";
      })
      .join("\n");
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div className="email-composer">

      {/* BOTTOM BAR */}
      <div className="composer-bottom-bar">
        <button className="bottom-btn" onClick={() => setShowPopup(true)}>
          + Add Component
        </button>

        <button
          className="bottom-btn preview-btn"
          onClick={() => setShowPreview(true)}
        >
          Preview Blog
        </button>
      </div>

      {/* MODAL PREVIEW */}
      {showPreview && (
        <PreviewModal
          id={i}
          title={title}
          meta_description={metaDescription}
          meta_title={metaTitle}
          thumbnail={thumbnail}
          blocks={blocks}
          html={generateHTML()}
          onClose={() => setShowPreview(false)}
        />
      )}
      
      {/* LEFT PANEL */}
      <div className="composer-panel" style={{ width: '100%' }}>

        {/* ================================================= */}
        {/* ✅ FOUR HARD SEPARATE FIELDS (TOP) */}
        {/* ================================================= */}
        <TextBlock
          id="blog-title"
          label="Title"
          singleLine
          content={title}
          onChange={(_, v) => setTitle(v)}
        />

        <ImageBlock
          id="blog-thumbnail"
          label="Thumbnail"
          content={thumbnail}
          onChange={(_, v) => setThumbnail(v)}
        />

        <TextBlock
          id="blog-meta-title"
          label="Meta Title"
          singleLine
          content={metaTitle}
          onChange={(_, v) => setMetaTitle(v)}
        />

        <TextBlock
          id="blog-meta-description"
          label="Meta Description"
          singleLine
          content={metaDescription}
          onChange={(_, v) => setMetaDescription(v)}
        />

        <Divider sx={{ my: 2 }} />

        {/* ================================================= */}
        {/* BLOCK EDITOR — UNTOUCHED */}
        {/* ================================================= */}
        <h3 style={{ marginTop: 10 }}>Blog Content</h3>

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
              <button className="block-btn delete" onClick={() => deleteBlock(block.id)}>Delete</button>
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

      {/* RIGHT PREVIEW — UNCHANGED */}
      <div className="preview-panel-fixed">
        <h2>{"Blog Content Preview"}</h2>

        {/* {thumbnail && (
          <img src={thumbnail} style={{ maxWidth: "100%", marginBottom: 10 }} />
        )} */}

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

export default function Index(){
  return(
    <BlogComposer />
  )
}