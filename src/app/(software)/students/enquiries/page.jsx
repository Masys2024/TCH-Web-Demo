"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { ENQUIRIES } from "@/constants/data/enquiries";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import {
  CheckCircle,
  CircleFadingPlus,
  CircleOff,
  EllipsisVertical,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const data = ENQUIRIES.map((enquiry) => ({
  name: `${enquiry?.First_Name || ""} ${enquiry?.Middle_Name || ""} ${
    enquiry?.Last_Name || ""
  }`.trim(),
  mobile: `${enquiry?.Mobile1} ${enquiry?.Mobile2}`,
  ...enquiry,
}));

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "Course_Name",
    header: "Course",
  },
  {
    accessorKey: "Assigned_To",
    header: "Assigned To",
  },
  {
    accessorKey: "Next_Followup_On",
    header: "Follow-up Date",
    cell: ({ getValue }) => {
      const date = getValue();
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      const colors = {
        todo: "bg-yellow-100 text-yellow-800",
        "in-progress": "bg-blue-100 text-blue-800",
        Interested: "bg-green-100 text-green-800",
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
    cell: EnquiryActions,
  },
];

export const statuses = [
  {
    label: "Interested",
    value: "Interested",
    icon: CheckCircle,
  },
  {
    label: "Not Interested",
    value: "Not Interested",
    icon: CircleOff,
  },
];

function EnquiryListView({ row, actionsComponent }) {
  const data = row.original;
  const Actions = actionsComponent;
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid gap-2">
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-sm text-muted-foreground">
              Mobile: {data.mobile}
            </p>
          </div>
        </div>
        <span className="text-sm">Course: {data.Course_Name}</span>
        <div className="grid gap-2 text-sm">
          <span>
            Follow-up Date:{" "}
            {new Date(data?.Next_Followup_On).toLocaleDateString()}
          </span>
          <span>Assigned To: {data.Assigned_To}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-2 py-1 rounded text-xs ${
              data.Status === "Interested"
                ? "bg-green-100 text-green-800"
                : data.status === "in-progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {data.Status}
          </span>
          <span className="text-sm text-gray-500">{data.priority}</span>
          {Actions && <Actions row={row} />}
        </div>
      </div>
    </div>
  );
}

// Example Actions Component
function EnquiryActions({ row }) {
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
              className="w-full text-left px-4 py-2 justify-start!"
            >
              <SquarePen className="size-4" /> Follow-up
            </Button>
            <Button
              variant={"ghost"}
              onClick={handleEdit}
              className="w-full text-left px-4 py-2 justify-start!"
            >
              <CheckCircle className="size-4" /> Convert
            </Button>
            <Button
              variant={"ghost"}
              onClick={handleEdit}
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

export default function EnquiriesDisplays() {
  return (
    <section className="p-6 max-w-7xl comtainer mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Track Enquiry</h1>
        <Link href={INTERNAL_LINKS.ADD_ENQUIRY}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search enquiries by name..."
        searchKeys={["name", "Course_Name"]}
        filters={[
          {
            columnId: "Status",
            title: "Status",
            options: statuses,
          },
        ]}
        // defaultPageSize={4}
        defaultView="table"
        enableViewToggle={true}
        listItemComponent={EnquiryListView}
        // gridItemComponent={EnquiryGridView}
        actionsComponent={EnquiryActions}
        enableRowSelection={true}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
      />
    </section>
  );
}
