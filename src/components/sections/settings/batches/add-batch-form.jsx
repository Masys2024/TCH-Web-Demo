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
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddBatchForm({ formData, setFormData }) {
  const [standards, setStandards] = useState([]);

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
            <DialogTitle>Batch</DialogTitle>
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

            {/* Batch Name */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Batch Name</Label>
              <Input
                name="batch_name"
                value={formData.batch_name}
                onChange={handleChange}
                placeholder="Enter Batch Name"
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
