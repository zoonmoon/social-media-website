export default function TextBlock({ id, content, onChange, label ='' }) {
  return (
    <>
      {label.trim().length > 0 ?
    
          <div >
            <strong>{label}</strong>
          </div>
    
        : <></>
      }
              <input
                  type="text"
                  className="text-block-input"
                  value={content}
                  placeholder="Write text..."
                  onChange={(e) => onChange(id, e.target.value)}
                />
    
        
      
    </>
    

  );
}
