"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import Link from "next/link";
import { CircleFadingPlus } from "lucide-react";
import { HOLIDAY_CALENDAR } from "@/constants/data/holiday-calendar";

export default function HolidayCalendarPage() {
  const data = HOLIDAY_CALENDAR.map((holiday, idx) => ({
    srNo: idx + 1,
    ...holiday,
  }));

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
      accessorKey: "Batch_Name",
      header: "Batch",
    },
    {
      accessorKey: "Holiday_Date",
      header: "Date",
      cell: ({ row }) => (
        <span>
          {new Date(row?.original?.Holiday_Date).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "Discription",
      header: "Description",
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Update Holiday</h1>
        <Link href={INTERNAL_LINKS.ADD_HOLIDAY_CALENDAR}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
        searchKeys={["Discription"]}
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
