"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { parseBulkStudents } from "@/utils/parseTimetable";
import * as XLSX from "xlsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { DataView } from "@/components/ui/data-table";

export default function BulkAdd() {
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = "Uploads"; // Adjust if needed
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        try {
          if (sheetData?.length <= 0) {
            throw new Error(
              "Sheet not Found, please download proper sheet using Download"
            );
          }
          const parsed = parseBulkStudents(sheetData);
          console.log(parsed);
          setJsonData(parsed);
        } catch (error) {
          console.log(error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const columns = [
    {
      accessorKey: "No",
      header: "#",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "Course_Name",
      header: "Course",
    },
    {
      accessorKey: "Std",
      header: "Std",
    },
    {
      accessorKey: "Div",
      header: "Batch",
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Students</h1>
        <Link href={INTERNAL_LINKS.ACTIVE_STUDENTS}>
          <Button>
            View <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </div>
      <Card className="container mx-auto p-4 mt-4">
        <CardHeader>
          <CardTitle className={"text-2xl"}>Upload Students</CardTitle>
          <CardAction>
            <SampleExcelDownload />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

          {/* Data Display */}

          {jsonData?.length > 0 && (
            <div className="container mt-10 pt-10 grid gap-4 border-t">
              <DataView
                data={jsonData}
                columns={columns}
                searchPlaceholder="Search students by name..."
                searchKeys={["name"]}
                defaultView="table"
                enableViewToggle={true}
                enableRowSelection={true}
                enablePagination={true}
                enableSorting={true}
                enableFiltering={true}
              />
              <Button className={"w-full mt-4"}>
                Upload <Upload className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

const SampleExcelDownload = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sample/add_student/StudentExcelFormat.xlsx"; // Make sure this file is in your public folder
    link.download = "sample.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload}>
      Download Sample <Download />
    </Button>
  );
};
