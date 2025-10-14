import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DatalistSingle } from "@/components/ui/datalist";
import { CATEGORIES } from "@/constants/data/categories";
import ImageUpload from "@/components/ui/image-upload";
import AddCategoryDialog from "./add-category";
import { Button } from "@/components/ui/button";

export default function AddBillForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    serialNo: "",
    billNo: "",
    billDate: "",
    title: "",
    category: "",
    attachment: "",
    description: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 pb-4">
          {/* Serial No */}
          <div className="w-full grid gap-2">
            <Label>Serial No.</Label>
            <Input
              type={"text"}
              disabled={true}
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.serialNo}</p>
          </div>

          {/* Bill No. */}
          <div className="w-full grid gap-2">
            <Label>Bill No.</Label>
            <Input
              type={"text"}
              name="billNo"
              value={formData.billNo}
              placeholder="Enter Bill / Invoice No."
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.billNo}</p>
          </div>

          {/* Bill Date */}
          <div className="w-full grid gap-2">
            <Label>Bill Date</Label>
            <Input
              type={"date"}
              name="billDate"
              value={formData.billDate}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.billDate}</p>
          </div>

          {/* Title */}
          <div className="w-full grid gap-2">
            <Label>Title</Label>
            <Input
              type={"text"}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.title}</p>
          </div>

          {/* Category */}
          <div className="w-full grid gap-2 col-span-2">
            <div className="w-full flex items-center justify-between gap-4">
              <Label>Category</Label>
              <AddCategoryDialog />
            </div>
            <DatalistSingle
              options={CATEGORIES.map((c) => ({
                label: c.CategoryName,
                value: c.Category_ID,
              }))}
              value={formData.category}
              onChange={(values) =>
                setFormData({ ...formData, category: values })
              }
              placeholder="Select Category..."
            />
            <p className="text-xs text-destructive">{errorText.category}</p>
          </div>

          {/* Status */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value={"Paid"}>Paid</SelectItem>
                  <SelectItem value={"Unpaid"}>Unpaid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.status}</p>
          </div>
        </div>

        {/* Description */}
        <div className="w-full grid gap-2 pb-4">
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Enter Description"
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

        <div className="flex items-center justify-end">
          {update ? (
            <Button disabled={loadingState} onClick={handleUpdate}>
              {loadingState ? "Updating Bill" : "Update Bill"}
            </Button>
          ) : (
            <Button disabled={loadingState} onClick={handleAdd}>
              {loadingState ? "Creating Bill" : "Create Bill"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
