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

export default function AddStandardForm({
  formData,
  setFormData,
  loadingState,
  handleAdd,
  update = false,
}) {
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
            <DialogTitle>Standard</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-2 gap-4 py-6">
            {/* Code */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Code</Label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter Code"
                className={"w-full"}
              />
            </div>

            {/* Standard Name */}
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Standard Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Standard Name"
                className={"w-full"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {update ? (
              <Button
                type="submit"
                disabled={loadingState}
                onClick={handleUpdate}
              >
                {loadingState ? "Updating" : "Update"}
              </Button>
            ) : (
              <Button type="submit" disabled={loadingState} onClick={handleAdd}>
                {loadingState ? "Adding" : "Add"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
