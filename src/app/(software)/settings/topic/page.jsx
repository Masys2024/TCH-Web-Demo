"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { SquarePen, EllipsisVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { STANDARDS } from "@/constants/data/standards";
import { SUBJECTS } from "@/constants/data/subjects";
import { TOPICS } from "@/constants/data/topics";
import AddTopicForm from "@/components/sections/settings/topics/add-topic-form";

const standards = STANDARDS.map((standard) => ({
  label: standard.Std_Name,
  value: standard.Std_Name,
  ...standard,
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

export default function TopicPage() {
  const data = TOPICS.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const [formData, setFormData] = useState({
    standard: "",
    subject: "",
    topic_name: "",
  });

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
    },
    {
      accessorKey: "Std_Name",
      header: "Standard",
    },
    {
      accessorKey: "Sub_Name",
      header: "Subject",
    },
    {
      accessorKey: "Topic_Name",
      header: "Topic",
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
        <h1 className="text-2xl font-semibold">Topics</h1>
        <AddTopicForm formData={formData} setFormData={setFormData} />
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
        filters={[
          {
            columnId: "Std_Name",
            title: "Standard",
            options: standards,
          },
          {
            columnId: "Sub_Name",
            title: "Subject",
            options: subjects,
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
