"use client";

import "react-markdown-editor-lite/lib/index.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export default function AddBannerImageForm({
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
  const [markdown, setMarkdown] = useState("");

  const handleEditorChange = ({ text }) => {
    setMarkdown(text);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Date */}
          <div className="w-full grid gap-2">
            <Label>Date</Label>
            <Input
              type={"date"}
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.date}</p>
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

          {/* Link */}
          <div className="w-full grid gap-2">
            <Label>Link</Label>
            <Input
              type={"text"}
              name="link"
              placeholder="Enter Link"
              value={formData.link}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.link}</p>
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

        {/* Description */}
        <div className="w-full grid gap-2">
          <Label>Description</Label>
          <MdEditor
            className="md-editor"
            value={markdown}
            renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={handleEditorChange}
            config={{
              view: {
                menu: true,
                md: true,
                html: true,
              },
              canView: {
                menu: true,
                md: true,
                html: true,
                both: true,
                fullScreen: true,
                hideMenu: true,
              },
              shortcuts: true,
            }}
          />
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
