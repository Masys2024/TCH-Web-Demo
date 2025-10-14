"use client";
import { FEES_OVERVIEW } from "@/constants/data/feesOverview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataView } from "@/components/ui/data-table";
import currencyFormatter from "@/utils/currencyFormatter";

export default function FeesOverviewPage() {
  const data = FEES_OVERVIEW.map((bill, idx) => ({
    name: `${bill?.First_Name || ""} ${bill?.Middle_Name || ""} ${
      bill?.Last_Name || ""
    }`.trim(),
    ...bill,
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
    },
    {
      accessorKey: "Course_Name",
      header: "Course Enrolled",
    },
    {
      accessorKey: "Final_T_Fees",
      header: "Total",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.Final_T_Fees)}</span>
      ),
    },
    {
      accessorKey: "T_Paid",
      header: "Paid",
      cell: ({ row }) => (
        <span>{currencyFormatter(row?.original?.T_Paid)}</span>
      ),
    },
    {
      accessorKey: "T_Bal",
      header: "Balance",
      cell: ({ row }) => <span>{currencyFormatter(row?.original?.T_Bal)}</span>,
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Fees Overview</h1>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search by name..."
        searchKeys={["name"]}
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
