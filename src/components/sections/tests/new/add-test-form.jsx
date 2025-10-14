import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { DatalistSingle } from "@/components/ui/datalist";
import { SUBJECTS } from "@/constants/data/subjects";
import { Input } from "@/components/ui/input";
import { TOPICS } from "@/constants/data/topics";

export default function AddTestForm({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    topic: "",
    subject: "",
    batch: "",
    description: "",
    standard: "",
    attachment: "",
  });
  const [standards, setStandards] = useState([]);
  const [topics, setTopics] = useState([]);
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
    setTopics([
      ...TOPICS.map((t) => ({
        value: t.Topic_Id,
        label: t.Topic_Name,
        ...t,
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
        <div className="grid grid-cols-4 gap-4 pb-4">
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

          {/* Topic */}
          <div className="w-full grid gap-2">
            <Label>Topic</Label>
            <DatalistSingle
              disabled={!formData.subject}
              options={topics?.filter(
                (t) => Number(t.Sub_Id) === Number(formData.subject)
              )}
              value={formData.topic}
              onChange={(value) => setFormData({ ...formData, topic: value })}
              placeholder="Select Topic..."
            />
            <p className="text-xs text-destructive">{errorText.topic}</p>
          </div>

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

          {/* From Time */}
          <div className="w-full grid gap-2">
            <Label>From Time</Label>
            <Input
              type={"time"}
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.fromTime}</p>
          </div>

          {/* To Time */}
          <div className="w-full grid gap-2">
            <Label>To Time</Label>
            <Input
              type={"time"}
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.toTime}</p>
          </div>

          {/* Minimum Marks */}
          <div className="w-full grid gap-2">
            <Label>Minimum Marks</Label>
            <Input
              type={"number"}
              name="minMarks"
              placeholder="Enter Minimum Marks"
              value={formData.minMarks}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.minMarks}</p>
          </div>

          {/* Total */}
          <div className="w-full grid gap-2">
            <Label>Total</Label>
            <Input
              type={"number"}
              name="total"
              placeholder="Enter Total Marks"
              value={formData.total}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.total}</p>
          </div>
        </div>

        {/* Syllabus / Remarks */}
        <div className="w-full grid gap-2 pb-4">
          <Label>Syllabus / Remarks</Label>
          <Textarea
            name="remarks"
            placeholder="Enter Syllabus / Remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.remarks}</p>
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
