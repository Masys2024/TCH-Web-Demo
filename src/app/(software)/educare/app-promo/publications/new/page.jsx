"use client";

import AddPublicationForm from "@/components/sections/educare/app-promo/add-publication-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewPublicationsPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    attachment: null,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">App Publication</h1>
        <Link href={INTERNAL_LINKS.VIEW_PUBLICATIONS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddPublicationForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
