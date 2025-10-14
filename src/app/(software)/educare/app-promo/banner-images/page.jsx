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
import { BANNER_IMAGES } from "@/constants/data/banner_images";
import { parseHtmlEncodedToText } from "@/utils/parseHtmlEncodedToText";

export default function BannerImages() {
  const data = BANNER_IMAGES.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const columns = [
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Title",
      header: "Title",
    },
    {
      accessorKey: "Url",
      header: "Url",
    },
    {
      accessorKey: "Description",
      header: "Description",
      cell: ({ row }) => {
        const descriptionText = parseHtmlEncodedToText(
          row?.original?.Description,
          "html"
        );
        return <span dangerouslySetInnerHTML={{ __html: descriptionText }} />;
      },
    },
    {
      accessorKey: "Image",
      header: "Attachment",
      cell: ({ row }) => {
        const handleDownload = () => {
          const fileUrl = `https://web.masysiclass.com/downloadBannerImages/${row?.original?.Image}`;
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
        <h1 className="text-2xl font-semibold">Banner Images</h1>
        <Link href={INTERNAL_LINKS.ADD_BANNER_IMAGES}>
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
