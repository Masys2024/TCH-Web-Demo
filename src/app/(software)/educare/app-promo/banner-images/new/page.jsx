"use client";

import AddBannerImageForm from "@/components/sections/educare/app-promo/banner-images/add-banner-image-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewBannerImagePage() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    title: "",
    link: "",
    description: "",
    attachment: null,
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Add Banner Images</h1>
        <Link href={INTERNAL_LINKS.VIEW_BANNER_IMAGES}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddBannerImageForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
