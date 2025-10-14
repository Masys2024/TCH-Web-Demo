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
import { TOPICS } from "@/constants/data/topics";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { CLASSROOMS } from "@/constants/data/rooms";
import { STAFFS } from "@/constants/data/staffs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddNewLecture({
  formData,
  setFormData,
  loadingState = false,
  update = false,
  handleAdd = () => {},
  handleUpdate = () => {},
}) {
  const [errorText, setErrorText] = useState({
    date: "",
    standard: "",
    batch: "",
    subject: "",
    topic: "",
    startTime: "",
    endTime: "",
    room: "",
    faculty: "",
    lectureType: "",
    description: "",
    attachment: "",
  });
  const [standards, setStandards] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [faculties, setFaculties] = useState([]);

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
    setRooms([
      ...CLASSROOMS.map((r) => ({
        value: r.ClassRoom_Id,
        label: r.ClassRoom_Name,
        ...r,
      })),
    ]);
    setFaculties([
      ...STAFFS.map((f) => ({
        value: f.ID,
        label: `${f.First_Name} ${f.Last_Name}`,
        ...f,
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

          {/* Start Time */}
          <div className="w-full grid gap-2">
            <Label>Start Time</Label>
            <Input
              type={"time"}
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.startTime}</p>
          </div>

          {/* End Time */}
          <div className="w-full grid gap-2">
            <Label>End Time</Label>
            <Input
              type={"time"}
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.endTime}</p>
          </div>

          {/* Room */}
          <div className="w-full grid gap-2">
            <Label>Class Room</Label>
            <DatalistSingle
              options={rooms}
              value={formData.room}
              onChange={(value) => setFormData({ ...formData, room: value })}
              placeholder="Select Class Room..."
            />
            <p className="text-xs text-destructive">{errorText.room}</p>
          </div>

          {/* Faculty */}
          <div className="w-full grid gap-2">
            <Label>Faculty</Label>
            <DatalistSingle
              options={faculties}
              value={formData.faculty}
              onChange={(value) => setFormData({ ...formData, faculty: value })}
              placeholder="Select Faculty..."
            />
            <p className="text-xs text-destructive">{errorText.faculty}</p>
          </div>

          {/* Lecture Type */}
          <div className="w-full grid gap-2">
            <Label>Lecture Type</Label>
            <Select
              value={formData.lectureType}
              onValueChange={(value) =>
                setFormData({ ...formData, lectureType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Lecture Type</SelectLabel>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.gender}</p>
          </div>
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
