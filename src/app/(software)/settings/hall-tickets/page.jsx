"use client";

import HallTicketForm from "@/components/sections/settings/hallticket/hall-ticket-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function HallTicketsPage() {
  const [formData, setFormData] = useState({
    header: "i-Class",
    line_1:
      "Residential Zone, RP-112 Globe Arcade, MIDC, Dombivli East, Dombivli, Maharashtra 421203",
    line_2: "",
    line_3: "",
    signature: "",
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Hallticket Settings</h1>
      </div>
      <HallTicketForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
