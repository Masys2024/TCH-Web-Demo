"use client";

import AddVoucherForm from "@/components/sections/accounts/vouchers/add-vouchers-form";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function VouchersNewPage() {
  const [formData, setFormData] = useState({
    serialNo: 6,
    voucherNo: "",
    voucherDate: new Date().toISOString().split("T")[0],
    financialYear: "",
    issuedBy: "Masys User",
    receiverName: "",
    amount: "",
    category: "",
    particulars: "",
    paymentMode: "Cash",
    paymentStatus: "Paid",
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Voucher Entry</h1>
        <Link href={INTERNAL_LINKS.VIEW_VOUCHERS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <AddVoucherForm formData={formData} setFormData={setFormData} />
    </section>
  );
}
