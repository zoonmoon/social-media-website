export default function AddBlockPopup({ onSelect, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h3>Add Component</h3>

        <button className="popup-option" onClick={() => onSelect("text")}>
          Text Field
        </button>

        <button className="popup-option" onClick={() => onSelect("richtext")}>
          Rich Text
        </button>

        <button className="popup-option" onClick={() => onSelect("image")}>
          Image
        </button>
      </div>
    </div>
  );
}
