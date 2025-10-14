"use client";

import AddVideoLinkForm from "@/components/sections/educare/study-materials/videos/add-video-link-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewVideoLinksPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    standard: "",
    batch: "",
    link: "",
    linkType: "",
    attachment: null,
    sendMessage: false,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Upload Video Links</h1>
        <Link href={INTERNAL_LINKS.VIEW_VIDEO_LINKS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddVideoLinkForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
