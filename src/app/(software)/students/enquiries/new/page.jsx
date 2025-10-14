"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewStudentEnquiry from "@/components/sections/students/enquiry/new-student-enquiry";
import { INTERNAL_LINKS } from "@/constants/navLinks";

export default function NewEnquiry() {
  const today = new Date().toISOString().split("T")[0];
  const [loadingState, setLoadingState] = useState(false);
  const [enquiryDetails, setEnquiryDetails] = useState({
    enquiryNo: 11,
    board: "",
    source: "",
    course: "",
    status: "",
    academicYear: "",
    nextFolloupDate: new Date().toISOString().split("T")[0],
    assignedTo: "",
  });

  const [studentDetails, setStudentDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
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

  return (
    <section>
      <div className="w-full py-4 px-8 flex items-center justify-between container mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold ">New Enquiry</h1>
        <Link href={INTERNAL_LINKS.DISPLAY_ENQUIRIES}>
          <Button>View Enquiries</Button>
        </Link>
      </div>
      <div className="grid gap-4 py-4 container mx-auto max-w-7xl">
        <NewStudentEnquiry
          loadingState={loadingState}
          enquiryDetails={enquiryDetails}
          setEnquiryDetails={setEnquiryDetails}
          studentDetails={studentDetails}
          setStudentDetails={setStudentDetails}
          parentDetails={parentDetails}
          setParentDetails={setParentDetails}
        />
      </div>
    </section>
  );
}
