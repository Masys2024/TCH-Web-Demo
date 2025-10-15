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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PersonalDetails({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    staffId: "",
    code: "",
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    dob: "",
    gender: "",
    mobile: "",
    altMobile: "",
    studentEmail: "",
    qualification: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 pb-4">
          {/* Staff Id */}
          {/* 
          <div className="w-full grid gap-2">
            <Label>Staff Id</Label> 
            <Input
              disabled={true}
              type={"text"}
              name="staffId"
              placeholder=""
              value={formData.staffId}
              onChange={handleChange}
            /> 
            <p className="text-xs text-destructive">{errorText.staffId}</p>
          </div>
          */}

          {/* Code */}
          <div className="w-full grid gap-2">
            <Label>Code</Label>
            <Input
              type={"text"}
              name="code"
              placeholder="Enter Code"
              value={formData.code}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.code}</p>
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

          {/* Designation */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>Designation</Label>
            <Input
              type={"text"}
              name="designation"
              placeholder="Enter Designation"
              value={formData.designation}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.designation}</p>
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

          {/* Qualification */}
          <div className="w-full grid gap-2">
            <Label>Qualification</Label>
            <Input
              type={"text"}
              name="qualification"
              placeholder="Enter Qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">
              {errorText.qualification}
            </p>
          </div>
        </div>

        <div className="w-full grid gap-2 pb-4">
          <Label>Address</Label>
          <Textarea
            name="address"
            placeholder="Please enter a valid address"
            value={formData.address}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
