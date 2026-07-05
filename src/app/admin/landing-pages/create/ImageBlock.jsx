import UploadMediaWidget from "@/app/_components/_media-upload";

export default function ImageBlock({ id, content, onChange, label='' }) {
  const handleSuccess = (url) => {
    onChange(id, url);
  };

  return (
    <div className="image-block">
      {label?.trim()?.length > 0 ? <div><strong>{label}</strong></div> : <></> }
      {content ? (
        <div>
        <img
          src={content}
          style={{maxWidth:'200px', maxHeight:'200px', objectFit:'cover'}}
          alt="Uploaded"
          className="image-preview"
        />
        </div>
      ) : (
        <p className="image-empty">No image selected</p>
      )}

      <UploadMediaWidget
        onSuccess={handleSuccess}
        uploadButtonText="Upload"
        buttonText="Choose Image"
      />
    </div>
  );
}
