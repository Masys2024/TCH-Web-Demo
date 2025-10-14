"use client";

import AddMasterAdminForm from "@/components/sections/settings/master-admin/add-master-admin-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    branch: "All Branches",
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

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Add Master Admin</h1>
        <Link href={INTERNAL_LINKS.VIEW_MASTER_ADMINS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddMasterAdminForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
