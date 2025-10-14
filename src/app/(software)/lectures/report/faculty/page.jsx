"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { THOUGHT_OF_THE_DAY } from "@/constants/data/thoughtOfTheDay";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import Link from "next/link";
import {
  CircleFadingPlus,
  SquarePen,
  EllipsisVertical,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { STAFFS } from "@/constants/data/staffs";
import { LECTURES } from "@/constants/data/lectures";
import convertTo24Hour from "@/utils/convertTo24Hour";

export default function FacultyLecturesPage() {
  const data = STAFFS.filter((staff) => staff.Role === "Teacher").map(
    (staff, idx) => ({
      srNo: idx + 1,
      name: `${staff?.First_Name || ""} ${staff?.Last_Name || ""}`.trim(),
      ...staff,
    })
  );

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "Count",
      header: "Lecture Count",
      cell: ({ row }) => {
        const count = LECTURES?.filter(
          (l) => Number(l.teacher) === Number(row?.original?.ID)
        );
        return (
          <Link href={`/lectures/?teacher=${row?.original?.code}`}>
            {count.length}
          </Link>
        );
      },
    },
    {
      accessorKey: "Total_Hours",
      header: "Total Hours",
      cell: ({ row }) => {
        const teacherLecs = LECTURES?.filter(
          (l) => Number(l.teacher) === Number(row?.original?.ID)
        )?.reduce((acc, lec) => {
          // Convert times to Date objects (using arbitrary same date)
          const start = new Date(`1970-01-01T${convertTo24Hour(lec.time_in)}`);
          const end = new Date(`1970-01-01T${convertTo24Hour(lec.time_out)}`);
          if (end - start <= 0) {
            console.log(lec);
          }

          // Calculate duration in hours
          const diffHours = (end - start) / (1000 * 60 * 60);

          return acc + diffHours;
        }, 0);
        return <span>{teacherLecs}</span>;
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
        <h1 className="text-2xl font-semibold">Lectures</h1>
        <Link href={INTERNAL_LINKS.ADD_LECTURES}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search staff by name..."
        searchKeys={["name"]}
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
