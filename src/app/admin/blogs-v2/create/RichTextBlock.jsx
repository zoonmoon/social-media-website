'use client'
import { useRef, useEffect, useState } from "react";

export default function RichTextBlock({ id, content, onChange }) {
  const ref = useRef();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  // Sync external content
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== content) {
      ref.current.innerHTML = content;
    }
  }, [content]);

  const detectFormatting = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
  };

  const handleInput = () => {
    onChange(id, ref.current.innerHTML);
    detectFormatting();
  };

  // Listen to REAL formatting changes:
  useEffect(() => {
    const handler = () => detectFormatting();

    document.addEventListener("selectionchange", handler);
    document.addEventListener("keyup", handler);        // CTRL+B, CTRL+I
    document.addEventListener("mouseup", handler);      // clicking text
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && (e.key === "b" || e.key === "i")) {
        setTimeout(() => detectFormatting(), 0);        // after execCommand
      }
    });

    return () => {
      document.removeEventListener("selectionchange", handler);
      document.removeEventListener("keyup", handler);
      document.removeEventListener("mouseup", handler);
    };
  }, []);

  // Toolbar bold
  const makeBold = () => {
    document.execCommand("bold");
    detectFormatting();
    onChange(id, ref.current.innerHTML);
  };

  // Toolbar italic
  const makeItalic = () => {
    document.execCommand("italic");
    detectFormatting();
    onChange(id, ref.current.innerHTML);
  };

  // Insert link (unchanged)
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;

    const title = prompt("Enter Link Title:") || url;

    const sel = window.getSelection();
    const range = sel.rangeCount ? sel.getRangeAt(0) : null;

    const a = document.createElement("a");
    a.href = url;
    a.title = title;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = title;

    if (range && !range.collapsed) {
      range.deleteContents();
      range.insertNode(a);
    } else {
      ref.current.appendChild(a);
    }

    onChange(id, ref.current.innerHTML);
    detectFormatting();
  };

  return (
    <div className="richtext-wrapper">
      <div className="richtext-toolbar">

        <button
          onClick={makeBold}
          className={isBold ? "toolbar-btn active" : "toolbar-btn"}
        >
          <b>B</b>
        </button>

        <button
          onClick={makeItalic}
          className={isItalic ? "toolbar-btn active" : "toolbar-btn"}
        >
          <i>I</i>
        </button>

        <button className="toolbar-btn" onClick={insertLink}>🔗</button>

      </div>

      <div
        ref={ref}
        className="rich-text-block"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      />
    </div>
  );
}
