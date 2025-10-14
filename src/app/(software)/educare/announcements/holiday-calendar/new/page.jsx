"use client";

import AddHolidayToCalendarForm from "@/components/sections/educare/announcements/holiday-calendar/add-holiday-to-calendar-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function PublishNewHolidayPage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    standard: "All",
    batch: "All",
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Publish Holiday</h1>
        <Link href={INTERNAL_LINKS.VIEW_DAILY_THOUGHTS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddHolidayToCalendarForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
