import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { DatalistSingle } from "@/components/ui/datalist";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";

export default function AddToGalleryForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    title: "",
    standard: "",
    batch: "",
    image: "",
  });
  const [standards, setStandards] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    setStandards([
      { value: "All", label: "All" },
      ...STANDARDS.map((s) => ({
        value: s.Std_Id,
        label: s.Std_Name,
        ...s,
      })),
    ]);

    setBatches([
      { value: "All", label: "All" },
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

          {/* Image */}
          <div className="w-full grid gap-2">
            <ImageUpload
              label="Image"
              // updateNote="Update only if necessary"
              initialImage={formData.image}
              onFileSelect={(file) => handleChange("image", file)}
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
