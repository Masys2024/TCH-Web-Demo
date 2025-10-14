import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import XlsxUpload from "@/components/ui/xlsx-upload";

export default function AddHolidayForm({ formData, setFormData }) {
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
            <DialogTitle>Add Staff Holiday</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-1 gap-4 py-6">
            {/* Type */}
            <div className="w-full grid gap-2">
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type</SelectLabel>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Multiple">Multiple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {formData.type === "Single" ? (
              <>
                {/* Holiday Date */}
                <div className="w-full grid gap-3">
                  <Label className={"w-full"}>Holiday Date</Label>
                  <Input
                    type={"date"}
                    name="holiday_date"
                    value={formData.holiday_date}
                    onChange={handleChange}
                    placeholder="Enter Holiday Date"
                    className={"w-full"}
                  />
                </div>

                {/* Holiday Description */}
                <div className="w-full grid gap-3">
                  <Label className={"w-full"}>Holiday Description</Label>
                  <Textarea
                    name="holiday_description"
                    value={formData.holiday_description}
                    onChange={handleChange}
                    placeholder="Enter Holiday Description"
                    className={"w-full"}
                  />
                </div>
              </>
            ) : (
              formData.type === "Multiple" && (
                <div className="w-full grid gap-3">
                  <Label className={"w-full"}>File:</Label>
                  <XlsxUpload value={formData.file} onChange={handleChange} />
                </div>
              )
            )}
          </div>
          {(formData.type === "Multiple" || formData.type === "Single") && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </Dialog>
  );
}
