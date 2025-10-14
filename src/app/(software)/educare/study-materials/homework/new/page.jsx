"use client";

import AddHomeworkForm from "@/components/sections/educare/study-materials/homework/add-homework-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewHomeworkPage() {
  const [formData, setFormData] = useState({
    submissionDate: new Date().toISOString().split("T")[0],
    subject: "",
    description: "",
    standard: "",
    batch: "",
    attachment: "",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Publish Homework</h1>
        <Link href={INTERNAL_LINKS.VIEW_HOMEWORK}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddHomeworkForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
