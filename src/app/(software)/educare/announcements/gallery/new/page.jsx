"use client";

import AddToGalleryForm from "@/components/sections/educare/announcements/gallery/add-to-gallery-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function AddToGalleryPage() {
  const [formData, setFormData] = useState({
    title: "",
    standard: "All",
    batch: "All",
    image: null,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Add Gallery</h1>
        <Link href={INTERNAL_LINKS.VIEW_GALLERY}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddToGalleryForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
