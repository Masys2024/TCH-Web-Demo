"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Files, HandCoins, User, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import PersonalDetails from "./personal-details";
import PayrollDetails from "./payroll-details";
import DocumentsUpload from "./documents-upload";

export default function AddStaffForm({
  personalDetails,
  setPersonalDetails,
  payrollDetails,
  setPayrollDetails,
  documentsUpload,
  setDocumentsUpload,
  handleUpload,
  loadingState
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const totalSteps = 3;
  const steps = [
    {
      icon: User,
      label: "Personal Details",
    },
    {
      icon: HandCoins,
      label: "Payroll",
    },
    {
      icon: Files,
      label: "Document",
    },
  ];

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      console.log(formData);
      setStep(0);
      setFormData({});
      handleUpload();
      alert("Form successfully submitted");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
            />
          </div>

          {steps.map((s, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out border-2 bg-background",
                  index < step &&
                  "bg-primary border-primary text-primary-foreground",
                  index === step && "border-primary text-primary",
                  index > step && "border-muted text-muted-foreground"
                )}
              >
                {index < step ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  index <= step ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {step === 0 && (
          <PersonalDetails
            formData={personalDetails}
            setFormData={setPersonalDetails}
          />
        )}

        {step === 1 && (
          <PayrollDetails
            formData={payrollDetails}
            setFormData={setPayrollDetails}
          />
        )}

        {step === 2 && (
          <DocumentsUpload
            formData={documentsUpload}
            setFormData={setDocumentsUpload}
          />
        )}

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button type="button" onClick={handleNext}>
            {step === totalSteps - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
