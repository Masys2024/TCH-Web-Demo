import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Label } from "./label"; // adjust import to your UI lib

const ImageUpload = ({
  label = "Upload Image",
  updateNote = null,
  initialImage = null,
  onFileSelect,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImage);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className={`w-full border rounded-md p-4 space-y-4 ${className}`}>
      {label && <Label className="block text-md font-medium">{label}</Label>}
      {updateNote && (
        <p className="italic text-sm text-destructive">{updateNote}</p>
      )}

      <div
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
          dragActive
            ? "border-primary bg-primary/50"
            : "border-muted-foreground"
        }`}
        onClick={() => fileInputRef.current.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="w-full flex items-center justify-center text-muted-foreground">
          <UploadCloud size={70} />
        </div>
        <p className="text-xs text-muted-foreground">
          Drag & drop or{" "}
          <span className="text-primary underline">click to upload</span>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {previewUrl && (
        <div className="border p-2 rounded-md max-w-xs">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="w-full rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
