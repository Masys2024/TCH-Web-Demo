import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { DatalistSingle } from "@/components/ui/datalist";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddPublicationForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    title: "",
    type: "",
    attachment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Title */}
          <div className="w-full grid gap-2">
            <Label>Title</Label>
            <Input
              type={"text"}
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.title}</p>
          </div>

          {/* Type */}
          <div className="w-full grid gap-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value={"Notes"}>Notes</SelectItem>
                  <SelectItem value={"Events"}>Events</SelectItem>
                  <SelectItem value={"Features"}>Features</SelectItem>
                  <SelectItem value={"Results"}>Results</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.type}</p>
          </div>

          {/* Attachment */}
          <div className="w-full grid gap-2">
            <ImageUpload
              label="Attachment"
              // updateNote="Update only if necessary"
              initialImage={formData.attachment}
              onFileSelect={(file) => handleChange("attachment", file)}
            />
            <p className="text-xs text-destructive">{errorText.attachment}</p>
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
