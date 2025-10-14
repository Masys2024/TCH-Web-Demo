"use client";

import { DataView } from "@/components/ui/data-table";
import { TESTS_RESULTS } from "@/constants/data/tests_results";

export default function ResultsSummary() {
  const data = TESTS_RESULTS.map((item, idx) => ({
    srNo: idx + 1,
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
      accessorKey: "Marks_Obtained",
      header: "Marks Obtained",
    },
    {
      accessorKey: "Max_Marks",
      header: "Total Marks",
    },
    {
      accessorKey: "Percentage",
      header: "Percentage",
      cell: ({ row }) => {
        const amount = Number(row?.original?.Percentage);
        return <span>{`${amount?.toFixed(2)}%`}</span>;
      },
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">View Exam Result</h1>
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
