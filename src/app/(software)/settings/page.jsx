"use client";

import AddSettingsForm from "@/components/sections/settings/index/add-settings-form";
import React, { useState } from "react";

export default function SettingsPage() {
  const [mainSettings, setMainSettings] = useState({
    whatsapp: false,
    paymentGateway: false,
  });
  const [bankDetails, setBankDetails] = useState({
    name: "",
    beneficiaryName: "",
    accountNo: "",
    branchName: "",
    ifscCode: "",
  });
  const [socialMedias, setSocialMedias] = useState({
    facebook: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Settings</h1>
      </div>
      <AddSettingsForm
        formData={mainSettings}
        setFormData={setMainSettings}
        bankDetails={bankDetails}
        setBankDetails={setBankDetails}
        socialMedias={socialMedias}
        setSocialMedias={setSocialMedias}
      />
    </section>
  );
}
