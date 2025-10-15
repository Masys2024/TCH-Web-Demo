"use client";

import AddStaffForm from "@/components/sections/staff/new/add-staff-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { createTeachers } from "@/lib/apis/teachers";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddStaff() {
  const [personalDetails, setPersonalDetails] = useState({
    staffId: 16,
    code: "",
    firstName: "",
    middleName: "",
    lastName: "",
    designation: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    altMobile: "",
    qualification: "",
    address: "",
  });

  const [payrollDetails, setPayrollDetails] = useState({
    shift1InTime: "",
    shift1OutTime: "",
    shift2InTime: "",
    shift2OutTime: "",
    secondShiftDays: [],
    weekOff: ["Sunday"],
    singlePunches: false,
    lateHalfDay: "Total Working Hours",
    staffType: "Non Teaching",
    payType: "Fixed",
    amount: "",
    overTimeConsideration: false,
    deductions: false,
  });

  const [documentsUpload, setDocumentsUpload] = useState({
    photo: null,
    idProof: null,
    addressProof: null,
  });

  const [loadingState, setLoadingState] = useState(false);

  const handleAdd = async () => {
    setLoadingState(true);
    try {
      await toast.promise(
        createTeachers({
          code: personalDetails.code,
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
        }),
        {
          loading: "Uploading teacher...",
          success: () => {
            resetForm();
            return "Teacher added to the master.";
          },
          error: "Error uploading data to the master.",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Error Uploading Data to the master");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Add Staff</h1>
        <Link href={INTERNAL_LINKS.ADD_STAFF}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <Card>
        <CardContent>
          <AddStaffForm
            personalDetails={personalDetails}
            setPersonalDetails={setPersonalDetails}
            payrollDetails={payrollDetails}
            setPayrollDetails={setPayrollDetails}
            documentsUpload={documentsUpload}
            setDocumentsUpload={setDocumentsUpload}
            handleUpload={handleAdd}
            loadingState={loadingState}
          />
        </CardContent>
      </Card>
    </section>
  );
}
