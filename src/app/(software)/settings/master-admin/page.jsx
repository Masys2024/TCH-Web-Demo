"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { STAFFS } from "@/constants/data/staffs";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { CircleFadingPlus, EllipsisVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MasterAdminPage() {
  const data = STAFFS?.filter((staff) => staff.Role === "Master-Admin").map(
    (staff) => ({
      name: `${staff?.First_Name || ""} ${staff?.Middle_Name || ""} ${
        staff?.Last_Name || ""
      }`.trim(),
      ...staff,
    })
  );

  const columns = [
    {
      accessorKey: "Photo",
      header: "Photo",
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage
            src={
              row?.original?.Photo !== ""
                ? `https://web.masysiclass.com/Documents/Student/Photos/${row?.original.Photo}`
                : ""
            }
            onError={(e) => (e.target.style.display = "none")}
            alt={`${row?.First_Name} ${row?.Last_Name}`}
          />
          <AvatarFallback>
            {row?.original?.First_Name?.charAt(0)}
            {row?.original?.Last_Name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "Branch_Name",
      header: "Branch Access",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <Link
          href={`/staffs/profile/${row?.original?.ID}`}
          className="text-primary"
        >
          {row?.original?.name}
        </Link>
      ),
    },
    {
      accessorKey: "Email",
      header: "Email",
    },
    {
      accessorKey: "Mobile_For_SMS",
      header: "Mobile",
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
        <h1 className="text-2xl font-semibold ">Master Admin Details</h1>
        <Link href={INTERNAL_LINKS.ADD_MASTER_ADMIN}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
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
