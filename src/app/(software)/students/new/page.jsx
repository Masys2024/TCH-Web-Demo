"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewStudentRegistration from "@/components/sections/students/new-student";
import { INTERNAL_LINKS } from "@/constants/navLinks";

export default function NewStudent() {
  const today = new Date().toISOString().split("T")[0];
  const [loadingState, setLoadingState] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    admissionDate: new Date().toISOString().split("T")[0],
    firstName: "",
    middleName: "",
    lastName: "",
    board: "",
    course: "",
    standard: "",
    studentId: "",
    school: "",
    previousStandard: "",
    previousPercentage: "",
    subjects: [],
    dob: "",
    gender: "",
    academicYear: "",
    studentMobileNo: "",
    studentEmail: "",
    address: "",
  });

  const [parentDetails, setParentDetails] = useState({
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
  });

  const [documents, setDocuments] = useState({
    photo: null,
    idProof: null,
    addressProof: null,
    motherPhoto: null,
    fatherPhoto: null,
  });

  return (
    <section>
      <div className="w-full py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">New Registration</h1>
        <Link href={INTERNAL_LINKS.DISPLAY_ENQUIRIES}>
          <Button>View Students</Button>
        </Link>
      </div>
      <div className="grid gap-4 p-4">
        <NewStudentRegistration
          loadingState={loadingState}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          parentDetails={parentDetails}
          setParentDetails={setParentDetails}
          documents={documents}
          setDocuments={setDocuments}
        />
      </div>
    </section>
  );
}
