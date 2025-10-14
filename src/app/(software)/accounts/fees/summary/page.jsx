"use client";

import { DataView } from "@/components/ui/data-table";
import currencyFormatter from "@/utils/currencyFormatter";
import { PAYMENT_LOGS } from "@/constants/data/paymentLogs";

export default function FeesSummaryPage() {
  const data = PAYMENT_LOGS.map((bill, idx) => ({
    srNo: idx + 1,
    ...bill,
  }));

  const columns = [
    {
      accessorKey: "srNo",
      header: "Sr No.",
    },
    {
      accessorKey: "Receipt_No",
      header: "Receipt No.",
    },
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => (
        <span>{new Date(row?.original?.Date).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "Student_Id",
      header: "Student Id",
    },
    {
      accessorKey: "Name",
      header: "Name",
    },
    {
      accessorKey: "Amt_Recieved",
      header: "Amount",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.Amt_Recieved)}</span>
      ),
    },
    {
      accessorKey: "Late_Fee_Amt",
      header: "Late Fee",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.Late_Fee_Amt)}</span>
      ),
    },
    {
      accessorKey: "T_Amt",
      header: "Total Amount",
      cell: ({ row }) => <span>{currencyFormatter(row?.original?.T_Amt)}</span>,
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Fees Summary</h1>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search by Students Name ..."
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
