"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import currencyFormatter from "@/utils/currencyFormatter";
import { CHEQUE_PAYMENTS } from "@/constants/data/cheque-payments";
import { INTERNAL_LINKS } from "@/constants/navLinks";
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

export default function FeesPayments() {
  const data = CHEQUE_PAYMENTS.map((item, idx) => ({
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
      accessorKey: "Bank_Name",
      header: "Bank Name",
    },
    {
      accessorKey: "Tuition_Amount",
      header: "Total Amount",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.Tuition_Amount)}</span>
      ),
    },
    {
      accessorKey: "Cheque_No",
      header: "Cheque_No",
    },
    {
      accessorKey: "Cheque_Date",
      header: "Cheque Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Cheque_Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Cheque_Status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();
        const colors = {
          Uncleared: "bg-red-100 text-red-800",
          Cleared: "bg-green-100 text-green-800",
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
        <h1 className="text-2xl font-semibold ">Update Cheque Payments</h1>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search by Student Name ..."
        filters={[
          {
            columnId: "Cheque_Status",
            title: "Status",
            options: [
              {
                value: "Cleared",
                label: "Cleared",
                icon: CheckCircle,
              },
              {
                value: "Uncleared",
                label: "Uncleared",
                icon: CircleX,
              },
            ],
          },
        ]}
        searchKeys={["Name"]}
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
