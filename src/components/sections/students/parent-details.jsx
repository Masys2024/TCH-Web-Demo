import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ParentDetails({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full border rounded-md p-4">
      <h1 className="text-lg font-medium mb-6"> Parent Details </h1>
      <div className="grid grid-cols-2 gap-4 pb-4">
        <div className="w-full grid gap-2">
          <Label>Father Name</Label>
          <Input
            type={"text"}
            name="fatherName"
            placeholder="Enter Father Name"
            value={formData.fatherName}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.fatherName}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Father Mobile</Label>
          <Input
            type={"text"}
            name="fatherPhone"
            placeholder="Enter Father Mobile"
            value={formData.fatherPhone}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.fatherPhone}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Father Email</Label>
          <Input
            type={"text"}
            name="fatherEmail"
            placeholder="Enter Father Email"
            value={formData.fatherEmail}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.fatherEmail}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Mother Name</Label>
          <Input
            type={"text"}
            name="motherName"
            placeholder="Enter Mother Name"
            value={formData.motherName}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.motherName}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Mother Mobile</Label>
          <Input
            type={"text"}
            name="motherPhone"
            placeholder="Enter Mother Mobile"
            value={formData.motherPhone}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.motherPhone}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Mother Email</Label>
          <Input
            type={"text"}
            name="motherEmail"
            placeholder="Enter Mother Email"
            value={formData.motherEmail}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.motherEmail}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Telephone</Label>
          <Input
            type={"text"}
            name="telephone"
            placeholder="Enter Telephone"
            value={formData.telephone}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.telephone}</p>
        </div>
      </div>

      <div className="w-full grid gap-2 pb-4">
        <Label>Father Office Address</Label>
        <Textarea
          name="fatherOfficeAddress"
          placeholder="Please enter a valid address"
          value={formData.fatherOfficeAddress}
          onChange={handleChange}
        />
        <p className="text-xs text-destructive">
          {errorText.fatherOfficeAddress}
        </p>
      </div>

      <div className="w-full grid gap-2 pb-4">
        <Label>Mother Office Address</Label>
        <Textarea
          name="motherOfficeAddress"
          placeholder="Please enter a valid address"
          value={formData.motherOfficeAddress}
          onChange={handleChange}
        />
        <p className="text-xs text-destructive">
          {errorText.motherOfficeAddress}
        </p>
      </div>
    </div>
  );
}
