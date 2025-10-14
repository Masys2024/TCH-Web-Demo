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
import { BALANCE_FEES } from "@/constants/data/balance_fees";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { Checkbox } from "@/components/ui/checkbox";

const standards = STANDARDS.map((standard) => ({
  label: standard.Std_Name,
  value: standard.Std_Name,
  ...standard,
}));

const seen = new Set();
const batches = BATCHES.filter((batch) => {
  const name = batch.Batch_Name;
  if (seen.has(name)) return false; // skip duplicates
  seen.add(name);
  return true;
}).map((batch) => ({
  label: batch.Batch_Name,
  value: batch.Batch_Name,
  ...batch,
}));

export default function PendingFeesPage() {
  const data = BALANCE_FEES.map((item, idx) => ({
    srNo: idx + 1,
    ...item,
  }));

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) =>
            table.toggleAllPageRowsSelected(checked)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      ),
    },
    {
      accessorKey: "Name",
      header: "Name",
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
      accessorKey: "Due_Date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Due_Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Amount",
      header: "Amount",
    },
    {
      accessorKey: "Payment_Status",
      header: "Status",
    },
    {
      accessorKey: "FatherMobile",
      header: "Father Mobile",
    },
    {
      accessorKey: "MotherMobile",
      header: "Mother Mobile",
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
        <h1 className="text-2xl font-semibold">Balance Fees</h1>
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
            columnId: "Batch_Name",
            title: "Batch",
            options: batches,
          },
        ]}
        defaultView="table"
        enableViewToggle={true}
        enableRowSelection={true}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
      />
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button>Send Marks</Button>
        <Button>Send Whatsapp Msg</Button>
      </div>
    </section>
  );
}
