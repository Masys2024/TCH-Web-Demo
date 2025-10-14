"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { BILLS } from "@/constants/data/bills";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import currencyFormatter from "@/utils/currencyFormatter";
import {
  CircleFadingPlus,
  SquarePen,
  EllipsisVertical,
  Trash2,
  CheckCircle,
  CircleX,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function BillsPage() {
  const data = BILLS.map((bill, idx) => ({
    srNo: idx + 1,
    ...bill,
  }));

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
    },
    {
      accessorKey: "Bill_No",
      header: "Bill No.",
    },
    {
      accessorKey: "Bill_Date",
      header: "Bill Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Bill_Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Title",
      header: "Title",
    },
    {
      accessorKey: "Amount",
      header: "Amount",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.Amount)}</span>
      ),
    },
    {
      accessorKey: "Description",
      header: "Description",
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const colors = {
          Unpaid: "bg-red-100 text-red-800",
          Paid: "bg-green-100 text-green-800",
        };
        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              colors[status] ? colors[status] : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </span>
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
        <h1 className="text-2xl font-semibold ">Bills</h1>
        <Link href={INTERNAL_LINKS.ADD_BILLS}>
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
            columnId: "Status",
            title: "Status",
            options: [
              {
                value: "Paid",
                label: "Paid",
                icon: CheckCircle,
              },
              {
                value: "Unpaid",
                label: "Unpaid",
                icon: CircleX,
              },
            ],
          },
        ]}
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
