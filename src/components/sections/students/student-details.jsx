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
import { ACADEMIC_YEARS } from "@/constants/academic-years";
import { BOARDS } from "@/constants/boards";
import { COURSES } from "@/constants/courses";
import { SOURCES } from "@/constants/source";
import { DatalistMulti, DatalistSingle } from "@/components/ui/datalist";
import { SUBJECTS } from "@/constants/data/subjects";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { SCHOOLS_COLLEGES } from "@/constants/data/schools_colleges";

export default function StudentDetails({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    mobileNo: "",
    studentEmail: "",
    address: "",
    subjects: [],
  });
  const [boards, setBoards] = useState([]);
  const [standards, setStandards] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [schoolsColleges, setSchoolsColleges] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    if (BOARDS?.length > 0) {
      setBoards(
        BOARDS.map((b) => ({
          value: b.Board_Id,
          label: b.Board_Name,
          ...b,
        }))
      );
      setStandards(
        STANDARDS.map((s) => ({
          value: s.Std_Id,
          label: s.Std_Name,
          ...s,
        }))
      );
      setBatches(
        BATCHES.map((b) => ({
          value: b.Batch_Id,
          label: b.Batch_Name,
          ...b,
        }))
      );
      setCourses(
        COURSES.map((s) => ({
          value: s.Course_Id,
          label: s.Course_Name,
          ...s,
        }))
      );
      setSubjects(
        SUBJECTS.map((s) => ({
          value: s.Sub_Id,
          label: s.Sub_Name,
          ...s,
        }))
      );
      setAcademicYears(
        ACADEMIC_YEARS.map((a) => ({
          value: a.Sr_No,
          label: a.Financial_Year,
          ...a,
        }))
      );
      setSchoolsColleges(
        SCHOOLS_COLLEGES.map((s) => ({
          value: s.School_Id,
          label: s.School_Name,
          ...s,
        }))
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!isNaN(formData.standard)) {
      setFormData({
        ...formData,
        subjects: subjects
          .filter((s) => Number(s.Std_Id) === Number(formData.standard))
          .map((s) => s.Sub_Id), // only keep Sub_Id values
      });
    }
  }, [formData.standard]);

  return (
    <div className="w-full border rounded-md p-4 col-span-2">
      <h1 className="text-lg font-medium mb-6"> Student Details </h1>

      <div className="grid grid-cols-4 gap-4 pb-4">
        {/* First Name */}
        <div className="w-full grid gap-2">
          <Label>First Name</Label>
          <Input
            type={"text"}
            name="firstName"
            placeholder="First Name"
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
            placeholder="Middle Name"
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
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.lastName}</p>
        </div>

        {/* School / College Name  */}
        <div className="w-full grid gap-2">
          <Label>School / College Name</Label>
          <DatalistSingle
            options={schoolsColleges}
            value={formData.school}
            onChange={(value) => setFormData({ ...formData, school: value })}
            placeholder="Select a school..."
          />
          <p className="text-xs text-destructive">{errorText.school}</p>
        </div>

        {/* Previous Standard */}
        <div className="w-full grid gap-2">
          <Label>Previous Standard</Label>
          <Input
            type={"text"}
            name="previousStandard"
            placeholder="Previous Standard"
            value={formData.previousStandard}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">
            {errorText.previousStandard}
          </p>
        </div>

        {/* Previous Percentage */}
        <div className="w-full grid gap-2">
          <Label>Previous Percentage</Label>
          <Input
            type={"text"}
            name="previousPercentage"
            placeholder="Previous Percentage"
            value={formData.previousPercentage}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">
            {errorText.previousPercentage}
          </p>
        </div>

        {/* Admission Date */}
        <div className="w-full grid gap-2">
          <Label>Admission Date</Label>
          <Input
            type={"date"}
            name="admissionDate"
            value={formData.admissionDate}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.admissionDate}</p>
        </div>

        {/* Academic Year */}
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

        {/* Board */}
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

        {/* Course */}
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

        {/* Standard */}
        <div className="w-full grid gap-2">
          <Label>Standard</Label>
          <DatalistSingle
            options={standards}
            value={formData.standard}
            onChange={(value) => setFormData({ ...formData, standard: value })}
            placeholder="Select a standard..."
          />
          <p className="text-xs text-destructive">{errorText.standard}</p>
        </div>

        {/* Batch */}
        <div className="w-full grid gap-2">
          <Label>Batch</Label>
          <DatalistSingle
            disabled={!formData.batch}
            options={batches?.filter(
              (b) => Number(b.Std_Id) === Number(formData.standard)
            )}
            value={formData.batch}
            onChange={(value) => setFormData({ ...formData, batch: value })}
            placeholder="Select a batch..."
          />
          <p className="text-xs text-destructive">{errorText.batch}</p>
        </div>

        {/* Subjects */}
        <div className="w-full grid gap-2 col-span-2">
          <Label>Subjects</Label>
          <DatalistMulti
            disabled={!formData.standard}
            options={subjects?.filter(
              (s) => Number(s.Std_Id) === Number(formData.standard)
            )}
            value={formData.subjects}
            onChange={(values) =>
              setFormData({ ...formData, subjects: values })
            }
            placeholder="Subjects..."
          />
          <p className="text-xs text-destructive">{errorText.subjects}</p>
        </div>

        {/* Student Id */}
        <div className="w-full grid gap-2">
          <Label>Student Id</Label>
          <Input
            type={"text"}
            name="studentId"
            placeholder="Student Id"
            value={formData.studentId}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.studentId}</p>
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

        {/* DOB */}
        <div className="w-full grid gap-2">
          <Label>DOB</Label>
          <Input
            type={"date"}
            name="dob"
            placeholder="Enter DOB"
            value={formData.dob}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.middleName}</p>
        </div>

        {/* Student Mobile */}
        <div className="w-full grid gap-2">
          <Label>Student Mobile</Label>
          <Input
            type={"text"}
            name="studentMobileNo"
            placeholder="Student Mobile No."
            value={formData.studentMobileNo}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">
            {errorText.studentMobileNo}
          </p>
        </div>

        {/* Student Email */}
        <div className="w-full grid gap-2">
          <Label>Student Email</Label>
          <Input
            type={"text"}
            name="studentEmail"
            placeholder="Enter Student Email"
            value={formData.studentEmail}
            onChange={handleChange}
          />
          <p className="text-xs text-destructive">{errorText.studentEmail}</p>
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
    </div>
  );
}
