"use client";

import AddTestForm from "@/components/sections/tests/new/add-test-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewTestPage() {
  const [formData, setFormData] = useState({
    topic: "",
    subject: "",
    batch: "",
    standard: "",
    date: new Date().toISOString().split("T")[0],
    fromTime: "",
    toTime: "",
    minMarks: "",
    total: "",
    remarks: "",
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Publish Test Schedule</h1>
        <Link href={INTERNAL_LINKS.VIEW_TESTS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddTestForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
