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

export default function BankAccountsDialog({ formData, setFormData }) {
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
            <DialogTitle>Bank Account Settings</DialogTitle>
          </DialogHeader>
          <div className="w-full grid grid-cols-2 gap-4 py-6">
            <div className="w-full grid gap-3">
              <Label className={"w-full"}>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Bank Name"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>Beneficiary Name</Label>
              <Input
                name="beneficiaryName"
                value={formData.beneficiaryName}
                onChange={handleChange}
                placeholder="Enter Beneficiary Name"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>Account No.</Label>
              <Input
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                placeholder="Enter Account No."
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>Branch Name</Label>
              <Input
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Enter Branch Name"
                className={"w-full"}
              />
            </div>
            <div className="grid gap-3">
              <Label>IFSC Code</Label>
              <Input
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter IFSC Code"
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
