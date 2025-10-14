import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function AddDailyThoughtForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    date: "",
    thought: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {/* Bill Date */}
          <div className="w-full grid gap-2">
            <Label>Date</Label>
            <Input
              disabled={true}
              type={"date"}
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.date}</p>
          </div>

          {/* Thought of the Day */}
          <div className="w-full grid gap-2 pb-4">
            <Label>Thought of the Day</Label>
            <Textarea
              name="thought"
              placeholder="Enter Thought of the Day"
              value={formData.thought}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.thought}</p>
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
              {loadingState ? "Publishing" : "Publish"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
