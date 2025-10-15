"use client";

import { Button } from "@/components/ui/button";
import { DataView } from "@/components/ui/data-table";
import { SquarePen, EllipsisVertical, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { STANDARDS } from "@/constants/data/standards";
import { SUBJECTS } from "@/constants/data/subjects";
import AddSubjectForm from "@/components/sections/settings/subjects/add-subject-form";
import { toast } from "sonner";
import { fetchSubjects, createSubjects } from "@/lib/apis/subjects";

const standards = STANDARDS.map((standard) => ({
  label: standard.Std_Name,
  value: standard.Std_Name,
  ...standard,
}));

export default function SubjectsPage() {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await toast.promise(
          (async () => {
            const response = await fetchSubjects();

            if (response?.returncode === 200) {
              const output = response.output.map((item, idx) => ({
                srNo: idx + 1,
                ...item,
              }));
              console.log("Data", output);
              setData(output);
            } else {
              // optionally throw an error to trigger toast error
              throw new Error("Failed to fetch");
            }

            return response;
          })(),
          {
            loading: "Fetching Subjects...",
            success: () => {
              return "Fetched Data.";
            },
            error: "Error fetching data from the master.",
          }
        );
      } catch (error) {
        toast.error(error?.message || "Error Fetching Data...");
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    standard: "",
    subject_name: "",
    code: "",
    name: "",
  });

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Subject",
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

  const resetForm = () => {
    setFormData({
      standard: "",
      code: "",
      name: "",
      batch_name: "",
    });
  };

  const handleAdd = async () => {
    setLoadingState(true);
    try {
      await toast.promise(createSubjects(formData), {
        loading: "Uploading subject...",
        success: () => {
          resetForm();
          return "Subject added to the master.";
        },
        error: "Error uploading data to the master.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Uploading Data to the master");
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subjects</h1>
        <AddSubjectForm
          formData={formData}
          setFormData={setFormData}
          handleAdd={handleAdd}
          loadingState={loadingState}
        />
      </div>

      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search ..."
        // filters={[
        //   {
        //     columnId: "Std_Name",
        //     title: "Standard",
        //     options: standards,
        //   },
        // ]}
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

// const columns = [
//   {
//     accessorKey: "srNo",
//     header: "Sr No.",
//   },
//   {
//     accessorKey: "Std_Name",
//     header: "Standard",
//   },
//   {
//     accessorKey: "Sub_Name",
//     header: "Subject",
//   },
//   {
//     accessorKey: "actions",
//     header: "",
//     cell: Actions,
//   },
// ];
