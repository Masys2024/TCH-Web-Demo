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
import { CLASSROOMS } from "@/constants/data/rooms";
import AddClassroomForm from "@/components/sections/settings/class-room/add-classroom-form";
import { toast } from "sonner";
import { createRooms, fetchRooms } from "@/lib/apis/rooms";

export default function ClassroomPage() {
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await toast.promise(
          (async () => {
            const response = await fetchRooms();

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
            loading: "Fetching Class Rooms...",
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
    room_name: "",
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
      header: "Class Room",
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
      code: "",
      name: "",
    });
  };

  const handleAdd = async () => {
    setLoadingState(true);
    try {
      await toast.promise(createRooms(formData), {
        loading: "Uploading room...",
        success: () => {
          resetForm();
          return "Room added to the master.";
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
        <h1 className="text-2xl font-semibold">Class Room</h1>
        <AddClassroomForm
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
//     accessorKey: "ClassRoom_Name",
//     header: "Class Room",
//   },
//   {
//     accessorKey: "actions",
//     header: "",
//     cell: Actions,
//   },
// ];
