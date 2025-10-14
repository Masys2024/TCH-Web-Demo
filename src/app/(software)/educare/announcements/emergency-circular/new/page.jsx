"use client";

import AddEmergencyNoticeForm from "@/components/sections/educare/announcements/emergency-circular/add-emergency-notice-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewStudentNoticePage() {
  const [formData, setFormData] = useState({
    noticeFor: "Student",
    title: "",
    description: "",
    standard: "All",
    batch: "All",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Publish Emergency Notice</h1>
        <Link href={INTERNAL_LINKS.VIEW_EMERGENCY_CIRCULARS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddEmergencyNoticeForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
