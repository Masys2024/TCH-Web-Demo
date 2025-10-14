import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";

export default function DocumentsUpload({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    photo: "",
    idProof: "",
    addressProof: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full border rounded-md p-4 col-span-2">
      <h1 className="text-lg font-medium mb-6">Documents Upload</h1>

      <div className="grid grid-cols-3 gap-8 pb-4">
        <div className="w-full grid gap-2">
          <ImageUpload
            label="Photo"
            // updateNote="Update only if necessary"
            initialImage={formData.photo}
            onFileSelect={(file) => handleChange("photo", file)}
          />
          <p className="text-xs text-destructive">{errorText.photo}</p>
        </div>
        <div className="w-full grid gap-2">
          <ImageUpload
            label="ID Proof"
            // updateNote="Update only if necessary"
            initialImage={formData.idProof}
            onFileSelect={(file) => handleChange("idProof", file)}
          />
          <p className="text-xs text-destructive">{errorText.idProof}</p>
        </div>
        <div className="w-full grid gap-2">
          <ImageUpload
            label="Address Proof"
            // updateNote="Update only if necessary"
            initialImage={formData.addressProof}
            onFileSelect={(file) => handleChange("addressProof", file)}
          />
          <p className="text-xs text-destructive">{errorText.addressProof}</p>
        </div>
      </div>
    </div>
  );
}
