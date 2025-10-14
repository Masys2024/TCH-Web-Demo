"use client";

import AddHolidayForm from "@/components/sections/settings/staff-holiday/add-holiday-form";
import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { STAFF_HOLIDAYS } from "@/constants/data/holiday-calendar";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react";

export default function StaffHolidaysPage() {
  const [formData, setFormData] = useState({
    type: "",
    holiday_date: new Date().toISOString().split("T")[0],
    holiday_description: "",
    file: null,
  });
  const data = STAFF_HOLIDAYS.map((holiday, idx) => ({
    srNo: idx + 1,
    ...holiday,
  }));

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
    },
    {
      accessorKey: "Branch",
      header: "Branch",
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
      accessorKey: "Description",
      header: "Description",
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
        <h1 className="text-2xl font-semibold">Update Staff/Faculty Holiday</h1>
        <AddHolidayForm formData={formData} setFormData={setFormData} />
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
