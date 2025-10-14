import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/constants/data/branches";
import { DatalistSingle } from "@/components/ui/datalist";
import ImageUpload from "@/components/ui/image-upload";

export default function AddMasterAdminForm({ formData, setFormData }) {
  const [branches, setBranches] = useState([]);
  const [errorText, setErrorText] = useState({
    branch: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    altMobile: "",
    designation: "",
  });

  useEffect(() => {
    if (BRANCHES?.length > 0) {
      const branches_ = [
        { value: "All Branches", label: "All Branches" },
        ...BRANCHES.map((b) => ({
          value: b.Head_Name,
          label: b.Head_Name,
          ...b,
        })),
      ];
      setBranches(branches_);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 pb-4">
          {/* Branch */}
          <div className="w-full grid gap-2">
            <Label>Branch</Label>
            <DatalistSingle
              options={branches}
              value={formData.branch}
              onChange={(value) => setFormData({ ...formData, branch: value })}
              placeholder="Select a Branch..."
            />
            <p className="text-xs text-destructive">{errorText.staffId}</p>
          </div>

          {/* First Name */}
          <div className="w-full grid gap-2">
            <Label>First Name</Label>
            <Input
              type={"text"}
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.firstName}</p>
          </div>

          {/* Middle Name */}
          <div className="w-full grid gap-2">
            <Label>Middle Name</Label>
            <Input
              type={"text"}
              name="middleName"
              placeholder="Enter Middle Name"
              value={formData.middleName}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.middleName}</p>
          </div>

          {/* Last Name */}
          <div className="w-full grid gap-2">
            <Label>Last Name</Label>
            <Input
              type={"text"}
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.lastName}</p>
          </div>

          {/* DOB */}
          <div className="w-full grid gap-2">
            <Label>DOB</Label>
            <Input
              type={"date"}
              name="designation"
              value={formData.dob}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.dob}</p>
          </div>

          {/* Gender */}
          <div className="w-full grid gap-2">
            <Label>Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.gender}</p>
          </div>

          {/* Email */}
          <div className="w-full grid gap-2">
            <Label>Email</Label>
            <Input
              type={"email"}
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.email}</p>
          </div>

          {/* Mobile */}
          <div className="w-full grid gap-2">
            <Label>Mobile</Label>
            <Input
              type={"text"}
              name="mobile"
              placeholder="Mobile No."
              value={formData.mobile}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.mobile}</p>
          </div>

          {/* Alt Mobile */}
          <div className="w-full grid gap-2">
            <Label>Alt Mobile</Label>
            <Input
              type={"text"}
              name="altMobile"
              placeholder="Alt Mobile No."
              value={formData.altMobile}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.altMobile}</p>
          </div>

          {/* Designation */}
          <div className="w-full grid gap-2">
            <Label>Designation</Label>
            <Input
              name="designation"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.designation}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
