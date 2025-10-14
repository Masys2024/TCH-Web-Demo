import { DatalistSingle } from "@/components/ui/datalist";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACADEMIC_YEARS } from "@/constants/academic-years";
import { BOARDS } from "@/constants/boards";
import { COURSES } from "@/constants/courses";
import { SOURCES } from "@/constants/source";
import { USERS } from "@/constants/users";
import { useEffect, useState } from "react";

export default function EnquiryDetails({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    enquiryNo: "",
    board: "",
    source: "",
    course: "",
    status: "",
    academicYear: "",
    nextFolloupDate: "",
    assignedTo: "",
  });

  const [boards, setBoards] = useState([]);
  const [sources, setSources] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    if (BOARDS?.length > 0) {
      setBoards(
        BOARDS.map((b) => ({
          value: b.Board_Id,
          label: b.Board_Name,
        }))
      );
      setSources(
        SOURCES.map((s) => ({
          value: s.Source_Id,
          label: s.Source_Name,
        }))
      );
      setCourses(
        COURSES.map((s) => ({
          value: s.Course_Id,
          label: s.Course_Name,
        }))
      );
      setUsers(
        USERS.map((u) => ({
          value: u.UserId,
          label: u.Name,
        }))
      );
      setAcademicYears(
        ACADEMIC_YEARS.map((a) => ({
          value: a.Sr_No,
          label: a.Financial_Year,
        }))
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation logic
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
    <div className="w-full border rounded-md p-4">
      <h1 className="text-lg font-medium mb-6"> Enquiry Details </h1>
      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
        <div className="w-full grid gap-2">
          <Label>Enquiry No.</Label>
          <Input
            type={"text"}
            disabled={true}
            name="enquiryNo"
            placeholder="eg; 01"
            value={formData.enquiryNo}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.enquiryNo}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Next Followup Date</Label>
          <Input
            type={"date"}
            name="nextFolloupDate"
            placeholder="eg; 09/10/25"
            value={formData.nextFolloupDate}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">
            {errorText.nextFolloupDate}
          </p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
        <div className="w-full grid gap-2">
          <Label>Board</Label>
          <DatalistSingle
            options={boards}
            value={formData.board}
            onChange={(value) => setFormData({ ...formData, board: value })}
            placeholder="Select a board..."
          />
          <p className="text-xs text-destructive">{errorText.board}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Source</Label>
          <DatalistSingle
            options={sources}
            value={formData.source}
            onChange={(value) => setFormData({ ...formData, source: value })}
            placeholder="Select a source..."
          />
          <p className="text-xs text-destructive">{errorText.source}</p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
        <div className="w-full grid gap-2">
          <Label>Course</Label>
          <DatalistSingle
            options={courses}
            value={formData.course}
            onChange={(value) => setFormData({ ...formData, course: value })}
            placeholder="Select a course..."
          />
          <p className="text-xs text-destructive">{errorText.course}</p>
        </div>

        <div className="w-full grid gap-2">
          <Label>Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="interested">Interested</SelectItem>
                <SelectItem value="not-interested">Not Interested</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-xs text-destructive">{errorText.source}</p>
        </div>
      </div>

      <div className="flex md:flex-row flex-col items-center justify-between gap-4 pb-4">
        <div className="w-full grid gap-2">
          <Label>Assigned To</Label>
          <DatalistSingle
            options={users}
            value={formData.assignedTo}
            onChange={(value) =>
              setFormData({ ...formData, assignedTo: value })
            }
            placeholder="Select a enquirer..."
          />
          <p className="text-xs text-destructive">{errorText.assignedTo}</p>
        </div>
        <div className="w-full grid gap-2">
          <Label>Academic Year</Label>
          <DatalistSingle
            options={academicYears}
            value={formData.academicYear}
            onChange={(value) =>
              setFormData({ ...formData, academicYear: value })
            }
            placeholder="Academic Year..."
          />
          <p className="text-xs text-destructive">{errorText.academicYear}</p>
        </div>
      </div>
    </div>
  );
}
