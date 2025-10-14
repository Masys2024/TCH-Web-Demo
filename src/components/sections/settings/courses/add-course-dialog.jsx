import { Button } from "@/components/ui/button";
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
import { CircleFadingPlus } from "lucide-react";

export default function AddCourseDialog({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            <DialogTitle>Course</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-2 gap-4 py-6">
            {/* Course Name */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Course Name</Label>
              <Input
                name="course_name"
                value={formData.course_name}
                onChange={handleChange}
                placeholder="Enter Course Name"
                className={"w-full"}
              />
            </div>

            {/* Course Fees */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Course Fees</Label>
              <Input
                name="course_fees"
                value={formData.course_fees}
                onChange={handleChange}
                placeholder="Enter Course Fees"
                className={"w-full"}
              />
            </div>

            {/* Books Fees */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Books Fees</Label>
              <Input
                name="books_fees"
                value={formData.books_fees}
                onChange={handleChange}
                placeholder="Enter Books Fees"
                className={"w-full"}
              />
            </div>

            {/* Total Fees */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Total Fees</Label>
              <Input
                name="total_fees"
                value={formData.total_fees}
                onChange={handleChange}
                placeholder="Enter Total Fees"
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
