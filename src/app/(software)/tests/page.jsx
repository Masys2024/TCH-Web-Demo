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
import { EXAMS } from "@/constants/data/tests";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { SUBJECTS } from "@/constants/data/subjects";

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

const subject_seen = new Set();
const subjects = SUBJECTS.filter((subject) => {
  const name = subject.Sub_Name;
  if (subject_seen.has(name)) return false; // skip duplicates
  subject_seen.add(name);
  return true;
}).map((subject) => ({
  label: subject.Sub_Name,
  value: subject.Sub_Name,
  ...subject,
}));

export default function TestsPage() {
  const data = EXAMS.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const columns = [
    {
      accessorKey: "Std_Name",
      header: "Standard",
    },
    {
      accessorKey: "Batch_Name",
      header: "Batch",
    },
    {
      accessorKey: "Test_Date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Test_Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Subject_Name",
      header: "Subject",
    },
    {
      accessorKey: "Topic_Name",
      header: "Topic",
    },
    {
      accessorKey: "Time_From",
      header: "From Time",
    },
    {
      accessorKey: "Time_To",
      header: "To Time",
    },
    {
      accessorKey: "Attendance_Marked",
      header: "Attendance",
    },
    {
      accessorKey: "Result_Uploaded",
      header: "Result Published",
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

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Exams</h1>
        <Link href={INTERNAL_LINKS.ADD_TESTS}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
        searchKeys={["Std_Name", "Batch_Name", "Subject_Name", "Topic_Name"]}
        defaultView="table"
        filters={[
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
          {
            columnId: "Subject_Name",
            title: "Subject",
            options: subjects,
          },
        ]}
        enableViewToggle={true}
        enableRowSelection={true}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
      />
    </section>
  );
}
