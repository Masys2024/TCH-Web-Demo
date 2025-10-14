"use client";

import AddDailyThoughtForm from "@/components/sections/educare/announcements/daily-thoughts/add-daily-thought-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function AddDailyThoughtsPage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    thought: "",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Thought of The Day</h1>
        <Link href={INTERNAL_LINKS.VIEW_DAILY_THOUGHTS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddDailyThoughtForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
