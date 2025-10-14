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
    // // Validation logic
    // let error = "";
    // switch (name) {
    //   case "name":
    //     if (/^[a-zA-ZÀ-ÿ0-9\s&',().\-\/]+$/.test(value)) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else if (value === "") {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else {
    //       error = "Enter a valid Name";
    //     }
    //     break;

    //   case "pincode": {
    //     const rawValue = value;
    //     const sanitized = rawValue.replace(/\s/g, "");

    //     // Allow only digits with optional one space (between 3rd and 4th digit)
    //     const isValidTyping = /^\d{0,3}\s?\d{0,3}$/.test(rawValue);

    //     if (isValidTyping && sanitized.length <= 6) {
    //       setFormData((prev) => ({ ...prev, [name]: rawValue }));

    //       if (sanitized.length === 0) {
    //         error = "";
    //       } else if (sanitized.length < 6) {
    //         error = "Pin Code must be 6 digits";
    //       } else if (!/^[1-9][0-9]{2}\s?[0-9]{3}$/.test(rawValue)) {
    //         error = "Enter a valid Pin Code";
    //       } else {
    //         error = "";
    //       }
    //     } else if (rawValue.length === 0) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: "" }));
    //     } else {
    //       error = "Only digits allowed, max 6 digits";
    //     }

    //     break;
    //   }

    //   case "gstin":
    //     const gstinValue = value.toUpperCase();

    //     if (gstinValue.length === 0) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: gstinValue }));
    //     } else if (gstinValue.length < 15) {
    //       error = "GSTIN must be 15 characters";
    //       setFormData((prev) => ({ ...prev, [name]: gstinValue }));
    //     } else if (gstinValue.length > 15) {
    //       error = "GSTIN must be 15 characters";
    //     } else if (
    //       !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
    //         gstinValue
    //       )
    //     ) {
    //       error = "Invalid GSTIN format";
    //       setFormData((prev) => ({ ...prev, [name]: gstinValue }));
    //     } else {
    //       error = ""; // Fully valid
    //       setFormData((prev) => ({ ...prev, [name]: gstinValue }));
    //     }
    //     break;

    //   case "state":
    //     if (/^[a-zA-ZÀ-ÿ\s'’.-]+$/.test(value)) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else if (value === "") {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else {
    //       error = "Enter a valid State Name";
    //     }
    //     break;

    //   case "city":
    //     if (/^[a-zA-ZÀ-ÿ\s'’.-]+$/.test(value)) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else if (value === "") {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else {
    //       error = "Enter a valid City Name";
    //     }
    //     break;

    //   case "country":
    //     if (/^[a-zA-ZÀ-ÿ\s'’.-]+$/.test(value)) {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else if (value === "") {
    //       error = "";
    //       setFormData((prev) => ({ ...prev, [name]: value }));
    //     } else {
    //       error = "Enter a valid Country Name";
    //     }
    //     break;

    //   default:
    //     error = "";
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // }
    // setErrorText((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="w-full border rounded-md p-4 col-span-2">
      <h1 className="text-lg font-medium mb-6"> Parent Details </h1>
      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
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
      </div>

      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
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
      </div>
    </div>
  );
}
