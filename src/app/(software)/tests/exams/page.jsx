"use client";
import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import Link from "next/link";
import {
  CircleFadingPlus,
  SquarePen,
  EllipsisVertical,
  Trash2,
  Download,
  Clock,
  CheckCircle,
} from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { EXAMS_SCHEDULES } from "@/constants/data/exams_schedules";
import { BATCHES } from "@/constants/data/batches";
import { STANDARDS } from "@/constants/data/standards";

const standards = STANDARDS.map((standard) => ({
  label: standard.Std_Name,
  value: standard.Std_Name,
  ...standard,
}));

const seen = new Set();
const batches = BATCHES.filter((batch) => {
  const name = batch.Batch_Name;
  if (seen.has(name)) return false; // skip duplicates
  seen.add(name);
  return true;
}).map((batch) => ({
  label: batch.Batch_Name,
  value: batch.Batch_Name,
  ...batch,
}));

export default function ExamsPage() {
  const data = EXAMS_SCHEDULES.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const columns = [
    {
      accessorKey: "Exam_No",
      header: "Exam No",
    },
    {
      accessorKey: "Exam_Id",
      header: "Exam",
    },
    {
      accessorKey: "Std_Name",
      header: "Standard",
    },
    {
      accessorKey: "Batch_Name",
      header: "Batch",
    },
    {
      accessorKey: "Date",
      header: "Date",
    },
    {
      accessorKey: "Day",
      header: "Day",
    },
    {
      accessorKey: "Timing",
      header: "Time",
    },
    {
      accessorKey: "Duration",
      header: "Duration",
    },
    {
      accessorKey: "Subjects",
      header: "Subjects",
    },
    {
      accessorKey: "Min_Marks",
      header: "Min Marks",
    },
    {
      accessorKey: "Total_Marks",
      header: "Total",
    },
    {
      accessorKey: "Syllabus",
      header: "Syllabus",
    },
    {
      accessorKey: "actions",
      header: "",
      cell: Actions,
    },
  ];

  // Example Actions Component
  function Actions({ row }) {
    const [isOpen, setIsOpen] = useState(false);
    const data = row.original;

    const handleEdit = () => {
      alert(`Edit task: ${data.name}`);
      setIsOpen(false);
    };

    const handleDelete = () => {
      alert(`Delete task: ${data.name}`);
      setIsOpen(false);
    };

    const handleDuplicate = () => {
      alert(`Duplicate task: ${data.name}`);
      setIsOpen(false);
    };

    return (
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size={"icon"}>
              <EllipsisVertical className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="grid gap-4">
              <Button
                variant={"ghost"}
                onClick={handleEdit}
                className="w-full px-6 py-2 flex! items-start! justify-start!"
              >
                <SquarePen className="size-4" /> Update
              </Button>
              <Button
                variant={"ghost"}
                onClick={handleDelete}
                className="w-full px-6 py-2 flex! items-start! justify-start!"
              >
                <Trash2 className="size-4" /> Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  const exams = [
    {
      label: "SEMESTER I",
      value: "SEMESTER I",
    },
    {
      label: "SEMESTER II",
      value: "SEMESTER II",
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exam Schedule</h1>
        <Link href={INTERNAL_LINKS.ADD_STUDENTS_NOTICE_MANAGEMENT}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
        filters={[
          {
            columnId: "Exam_Id",
            title: "Exam",
            options: exams,
          },
          {
            columnId: "Std_Name",
            title: "Standard",
            options: standards,
          },
          {
            columnId: "Batch_Name",
            title: "Batch",
            options: batches,
          },
        ]}
        defaultView="table"
        enableViewToggle={true}
        enableRowSelection={true}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
      />
    </section>
  );
}
