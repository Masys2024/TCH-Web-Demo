import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

export default function HallTicketForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    header: "",
    line_1: "",
    line_2: "",
    line_3: "",
    signature: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Header */}
          <div className="w-full grid gap-2">
            <Label>Header</Label>
            <Input
              type={"text"}
              name="header"
              placeholder="Enter Header"
              value={formData.header}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.header}</p>
          </div>

          {/* Line 1 */}
          <div className="w-full grid gap-2">
            <Label>Line 1</Label>
            <Input
              type={"text"}
              name="line_1"
              placeholder="Enter Line 1"
              value={formData.line_1}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.line_1}</p>
          </div>

          {/* Line 2 */}
          <div className="w-full grid gap-2">
            <Label>Line 2</Label>
            <Input
              type={"text"}
              name="line_2"
              placeholder="Enter Line 2"
              value={formData.line_2}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.line_2}</p>
          </div>

          {/* Line 3 */}
          <div className="w-full grid gap-2">
            <Label>Line 3</Label>
            <Input
              type={"text"}
              name="line_3"
              placeholder="Enter Line 3"
              value={formData.line_3}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.line_3}</p>
          </div>

          {/* Signature */}
          <div className="w-full grid gap-2">
            <ImageUpload
              label="Signature"
              // updateNote="Update only if necessary"
              initialImage={formData.signature}
              onFileSelect={(file) => handleChange("signature", file)}
            />
            <p className="text-xs text-destructive">{errorText.image}</p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          {update ? (
            <Button disabled={loadingState} onClick={handleUpdate}>
              {loadingState ? "Updating" : "Update"}
            </Button>
          ) : (
            <Button disabled={loadingState} onClick={handleAdd}>
              {loadingState ? "Adding" : "Add"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
