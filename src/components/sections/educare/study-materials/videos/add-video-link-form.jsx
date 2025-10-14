import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { DatalistSingle } from "@/components/ui/datalist";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

export default function AddVideoLinkForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    title: "",
    description: "",
    standard: "",
    batch: "",
    link: "",
    linkType: "",
    attachment: "",
  });
  const [standards, setStandards] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    setStandards([
      ...STANDARDS.map((s) => ({
        value: s.Std_Id,
        label: s.Std_Name,
        ...s,
      })),
    ]);

    setBatches([
      ...BATCHES.map((b) => ({
        value: b.Batch_Id,
        label: b.Batch_Name,
        ...b,
      })),
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 pb-4">
          {/* Standard */}
          <div className="w-full grid gap-2">
            <Label>Standard</Label>
            <DatalistSingle
              options={standards}
              value={formData.standard}
              onChange={(value) =>
                setFormData({ ...formData, standard: value })
              }
              placeholder="Select a standard..."
            />
            <p className="text-xs text-destructive">{errorText.standard}</p>
          </div>

          {/* Batch */}
          <div className="w-full grid gap-2">
            <Label>Batch</Label>
            <DatalistSingle
              disabled={!formData.standard || formData.standard === "All"}
              options={batches?.filter(
                (b) =>
                  Number(b.Std_Id) === Number(formData.standard) ||
                  b.value === "All"
              )}
              value={formData.batch}
              onChange={(value) => setFormData({ ...formData, batch: value })}
              placeholder="Select a batch..."
            />
            <p className="text-xs text-destructive">{errorText.batch}</p>
          </div>

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

          {/* Description */}
          <div className="w-full grid gap-2 col-span-3">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.description}</p>
          </div>

          {/* Link Type */}
          <div className="w-full grid gap-2">
            <Label>Link Type</Label>
            <Select
              value={formData.linkType}
              onValueChange={(value) =>
                setFormData({ ...formData, linkType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Link Type</SelectLabel>
                  <SelectItem value={"Google Drive"}>Google Drive</SelectItem>
                  <SelectItem value={"Youtube"}>Youtube</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.linkType}</p>
          </div>

          {/* Link */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>Link</Label>
            <Input
              type={"text"}
              name="link"
              placeholder="Enter Link"
              value={formData.link}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.description}</p>
          </div>

          {/* Attachment */}
          <div className="w-full grid gap-2 col-span-3">
            <ImageUpload
              label="Attachment"
              // updateNote="Update only if necessary"
              initialImage={formData.attachment}
              onFileSelect={(file) => handleChange("attachment", file)}
            />
            <p className="text-xs text-destructive">{errorText.attachment}</p>
          </div>
        </div>
        <div className="flex">
          <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/10">
            <Checkbox
              id="toggle-2"
              name="sendMessage"
              checked={formData.sendMessage}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  sendMessage: checked,
                })
              }
            />

            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">
                Send Whatsapp Message
              </p>
            </div>
          </Label>
        </div>
        <div className="flex items-center justify-end">
          {update ? (
            <Button disabled={loadingState} onClick={handleUpdate}>
              {loadingState ? "Updating" : "Update"}
            </Button>
          ) : (
            <Button disabled={loadingState} onClick={handleAdd}>
              {loadingState ? "Uploading" : "Upload"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
