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
import { COMPLAINTS } from "@/constants/data/complaints";

export default function ViewComplaints() {
  const data = COMPLAINTS.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const columns = [
    {
      accessorKey: "Student_Id",
      header: "Student Id",
    },
    {
      accessorKey: "Name",
      header: "Name",
    },
    {
      accessorKey: "Title",
      header: "Subject",
    },
    {
      accessorKey: "Description",
      header: "Description",
    },
    {
      accessorKey: "Raised_On",
      header: "Posted Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Raised_On).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
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
        <h1 className="text-2xl font-semibold">Complaints</h1>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search by Subject ..."
        searchKeys={["Title"]}
        filters={[
          {
            columnId: "Status",
            title: "Status",
            options: [
              {
                label: "Pending",
                value: "Pending",
                icon: Clock,
              },
              {
                label: "Replied",
                value: "Replied",
                icon: CheckCircle,
              },
            ],
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
