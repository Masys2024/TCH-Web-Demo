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
} from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { PUBLICATIONS } from "@/constants/data/publications";

export default function PublicationsPage() {
  const data = PUBLICATIONS.map((publication, idx) => ({
    srNo: idx + 1,
    ...publication,
  }));

  const columns = [
    {
      accessorKey: "Uploaded_On",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Uploaded_On).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Type",
      header: "Type",
    },
    {
      accessorKey: "Title",
      header: "Title",
    },
    {
      accessorKey: "Attachment",
      header: "Attachment",
      cell: ({ row }) => {
        const handleDownload = () => {
          const fileUrl = `https://web.masysiclass.com/downloadPublication/${row?.original?.Attachment}`;
          const link = document.createElement("a");
          link.href = fileUrl;
          // Optional: Extract filename from the URL if available
          const filename = fileUrl.split("/").pop();
          link.download = filename || "download";
          // Open in a new tab if needed
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return (
          <Button variant={"link"} size={"icon"} onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
        );
      },
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
        <h1 className="text-2xl font-semibold">Publication</h1>
        <Link href={INTERNAL_LINKS.ADD_PUBLICATIONS}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search by Title ..."
        searchKeys={["Title"]}
        filters={[
          {
            columnId: "Type",
            title: "Type",
            options: [
              {
                label: "Events",
                value: "Events",
              },
              {
                label: "Notes",
                value: "Notes",
              },
              {
                label: "Features",
                value: "Features",
              },
              {
                label: "Results",
                value: "Results",
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
