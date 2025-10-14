import { Button } from "@/components/ui/button";
import { DatalistSingle } from "@/components/ui/datalist";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STANDARDS } from "@/constants/data/standards";
import { SUBJECTS } from "@/constants/data/subjects";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddTopicForm({ formData, setFormData }) {
  const [standards, setStandards] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setStandards([
      ...STANDARDS.map((s) => ({
        value: s.Std_Id,
        label: s.Std_Name,
        ...s,
      })),
    ]);
    const subject_seen = new Set();
    const all_subjects = SUBJECTS.filter((subject) => {
      const name = subject.Sub_Name;
      if (subject_seen.has(name)) return false; // skip duplicates
      subject_seen.add(name);
      return true;
    }).map((subject) => ({
      label: subject.Sub_Name,
      value: subject.Sub_Name,
      ...subject,
    }));
    setSubjects(all_subjects);
  }, []);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Add Subject</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-2 gap-4 py-6">
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
            </div>

            {/* Subject */}
            <div className="w-full grid gap-2">
              <Label>Subject</Label>
              <DatalistSingle
                options={subjects}
                value={formData.subject}
                onChange={(value) =>
                  setFormData({ ...formData, subject: value })
                }
                placeholder="Select a subject..."
              />
            </div>

            {/* Topic Name */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Topic Name</Label>
              <Input
                name="topic_name"
                value={formData.topic_name}
                onChange={handleChange}
                placeholder="Enter Topic Name"
                className={"w-full"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
