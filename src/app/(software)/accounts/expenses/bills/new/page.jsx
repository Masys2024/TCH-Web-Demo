"use client";

import AddBillForm from "@/components/sections/accounts/bills/add-bill-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function BillsNewPage() {
  const [formData, setFormData] = useState({
    serialNo: 16,
    billNo: "",
    billDate: new Date().toISOString().split("T")[0],
    title: "",
    category: "",
    attachment: null,
    description: "",
    status: "",
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Bill Entry</h1>
        <Link href={INTERNAL_LINKS.VIEW_BILLS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddBillForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
