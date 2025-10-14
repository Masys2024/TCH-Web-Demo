"use client";

import AddNotesForm from "@/components/sections/educare/study-materials/notes/add-notes-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewNotesPage() {
  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    description: "",
    standard: "",
    batch: "",
    attachment: "",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Upload Notes</h1>
        <Link href={INTERNAL_LINKS.VIEW_NOTES}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddNotesForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
