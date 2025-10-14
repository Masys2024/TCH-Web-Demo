"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import {
  CircleFadingPlus,
  EllipsisVertical,
  SquarePen,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COURSES } from "@/constants/courses";
import { STANDARDS } from "@/constants/data/standards";
import { BATCHES } from "@/constants/data/batches";
import { INACTIVE_STUDENTS } from "@/constants/data/inactive_students";

const data = INACTIVE_STUDENTS.map((student) => ({
  name: `${student?.First_Name || ""} ${student?.Middle_Name || ""} ${
    student?.Last_Name || ""
  }`.trim(),
  mobile: `${student?.Father_Mobile && `F - ${student?.Father_Mobile} / `}${
    student?.Mother_Mobile && `M - ${student?.Mother_Mobile}`
  }`,
  ...student,
}));

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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/students/profile/${row?.original?.ID}`}
        className="text-primary"
      >
        {row?.original?.name}
      </Link>
    ),
  },
  {
    accessorKey: "Student_Id",
    header: "Student Id",
  },
  {
    accessorKey: "Course_Name",
    header: "Course",
  },
  {
    accessorKey: "Std_Name",
    header: "Std_Name",
  },
  {
    accessorKey: "Batch_Name",
    header: "Batch",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: Actions,
  },
];

const courses = COURSES.map((course) => ({
  label: course.Course_Name,
  value: course.Course_Name,
  ...course,
}));

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
              className="w-full text-left px-4 py-2 justify-start!"
            >
              <SquarePen className="size-4" /> Active
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

export default function InActiveStudents() {
  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">In-Active Student Details</h1>
        <Link href={INTERNAL_LINKS.ADD_STUDENT}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search students by name..."
        searchKeys={["name"]}
        filters={[
          {
            columnId: "Course_Name",
            title: "Course",
            options: courses,
          },
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
        // listItemComponent={EnquiryListView}
        // gridItemComponent={EnquiryGridView}
        actionsComponent={Actions}
        enableRowSelection={true}
        enablePagination={true}
        enableSorting={true}
        enableFiltering={true}
      />
    </section>
  );
}
