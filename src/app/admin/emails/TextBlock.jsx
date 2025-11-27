export default function TextBlock({ id, content, onChange }) {
  return (
    <input
      type="text"
      className="text-block-input"
      value={content}
      placeholder="Write text..."
      onChange={(e) => onChange(id, e.target.value)}
    />
  );
}
