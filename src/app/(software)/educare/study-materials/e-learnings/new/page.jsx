"use client";

import AddELearningForm from "@/components/sections/educare/study-materials/e-learnings/add-elearning-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewELearningPage() {
  const [formData, setFormData] = useState({
    topic: "",
    subject: "",
    description: "",
    standard: "",
    attachment: "",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Add E-Learning Videos</h1>
        <Link href={INTERNAL_LINKS.VIEW_E_LEARNING}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddELearningForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
