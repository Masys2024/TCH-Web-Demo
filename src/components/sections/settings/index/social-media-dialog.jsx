import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SocialMediaDialog({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Configure</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Social Media Settings</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-2 gap-4 py-6">
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Facebook</Label>
              <Input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="Enter Facebook"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>LinkedIn</Label>
              <Input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="Enter LinkedIn"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>Instagram</Label>
              <Input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="Enter Instagram"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>Youtube</Label>
              <Input
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="Enter Youtube"
                className={"w-full"}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
