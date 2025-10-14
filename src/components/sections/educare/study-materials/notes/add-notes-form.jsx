import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { DatalistSingle } from "@/components/ui/datalist";
import { SUBJECTS } from "@/constants/data/subjects";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

export default function AddNotesForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    submissionDate: "",
    subject: "",
    description: "",
    standard: "",
    batch: "",
    attachment: "",
  });
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    setStandards([
      ...STANDARDS.map((s) => ({
        value: s.Std_Id,
        label: s.Std_Name,
        ...s,
      })),
    ]);
    setSubjects(
      SUBJECTS.map((s) => ({
        value: s.Sub_Id,
        label: s.Sub_Name,
        ...s,
      }))
    );
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
        <div className="grid grid-cols-1 gap-4 pb-4">
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

          {/* Subject */}
          <div className="w-full grid gap-2">
            <Label>Subject</Label>
            <DatalistSingle
              disabled={!formData.standard}
              options={subjects?.filter(
                (s) => Number(s.Std_Id) === Number(formData.standard)
              )}
              value={formData.subject}
              onChange={(value) => setFormData({ ...formData, subject: value })}
              placeholder="Select Subject..."
            />
            <p className="text-xs text-destructive">{errorText.subject}</p>
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
          <div className="w-full grid gap-2 pb-4">
            <Label>Description / Link</Label>
            <Textarea
              name="description"
              placeholder="Enter Description / Link"
              value={formData.description}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.description}</p>
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
