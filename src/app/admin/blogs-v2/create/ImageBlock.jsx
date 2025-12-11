import UploadMediaWidget from "@/app/_components/_media-upload";

export default function ImageBlock({ id, content, onChange }) {
  const handleSuccess = (url) => {
    onChange(id, url);
  };

  return (
    <div className="image-block">
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
