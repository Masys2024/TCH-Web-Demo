"use client";

import { DataView } from "@/components/ui/data-table";
import { STAFF_ATTENDANCES } from "@/constants/data/staffAttendance";
import { STAFFS } from "@/constants/data/staffs";
import { DAYS } from "@/constants/days";
import React from "react";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function StaffsAttendacesPage() {
  const transformAttendance = (attendanceData) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return {
        day: days[date.getDay()],
        date: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        month: months[date.getMonth()],
        year: date.getFullYear(),
        monthYear: `${months[date.getMonth()]} ${date.getFullYear()}`,
        fullDate: date.toISOString().split("T")[0],
      };
    };

    const processTimeLogs = (timeLogString) => {
      if (!timeLogString) return [];

      const timeEntries = timeLogString
        .split(", ")
        .filter((entry) => entry.trim());
      const timeLogPairs = [];

      for (let i = 0; i < timeEntries.length; i += 2) {
        if (i + 1 < timeEntries.length) {
          timeLogPairs.push(
            `(In Time: ${timeEntries[i]}, Out Time: ${timeEntries[i + 1]})`
          );
        } else {
          timeLogPairs.push(`(In Time: ${timeEntries[i]}, Out Time: --)`);
        }
      }

      return timeLogPairs;
    };

    // Use a map to merge entries for same staff on same date
    const entryMap = new Map();

    attendanceData.forEach((entry) => {
      const dateInfo = formatDate(entry.Date);
      const timeLogs = processTimeLogs(entry.TimeLog);

      // Create a unique key for staff + date combination
      const key = `${entry.Name}_${dateInfo.fullDate}`;

      if (entryMap.has(key)) {
        // Merge time logs if entry already exists
        const existingEntry = entryMap.get(key);
        existingEntry.values[0].timeLog = [
          ...existingEntry.values[0].timeLog,
          ...timeLogs,
        ];
      } else {
        // Create new entry
        entryMap.set(key, {
          year: dateInfo.year,
          month: dateInfo.month,
          monthYear: dateInfo.monthYear,
          day: dateInfo.day,
          date: dateInfo.date,
          staff: entry.Name,
          values: [
            {
              Staff_Name: entry.Name,
              timeLog: timeLogs,
            },
          ],
        });
      }
    });

    // Convert map to array
    const result = Array.from(entryMap.values());

    // Sort the results
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return result.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.month !== b.month)
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      if (a.staff !== b.staff) return a.staff.localeCompare(b.staff);
      return new Date(b.date) - new Date(a.date);
    });
  };

  const data = transformAttendance(STAFF_ATTENDANCES);
  const staffs = STAFFS.map((staff) => ({
    label: `${staff.First_Name} ${staff.Last_Name}`,
    value: `${staff.First_Name} ${staff.Last_Name}`,
    ...staff,
  }));

  const presetFilters = [
    {
      columnId: "month",
      value: [months[new Date().getMonth()]],
    },
    {
      columnId: "year",
      value: [new Date().getFullYear()],
    },
  ];
  console.log("Data", data);

  const columns = [
    {
      accessorKey: "month",
      header: "Month",
    },
    {
      accessorKey: "year",
      header: "year",
    },
    {
      accessorKey: "day",
      header: "Day",
      //   cell: ({ row }) => (
      //     <Link
      //       href={`/staffs/profile/${row?.original?.ID}`}
      //       className="text-primary"
      //     >
      //       {row?.original?.name}
      //     </Link>
      //   ),
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "staff",
      header: "Staff",
    },
    {
      accessorKey: "inOut",
      header: "In Out",
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          {row?.original?.values?.map((log, idx) => (
            <span key={idx} className="text-sm">
              {log?.timeLog}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Faculty In Out Reports</h1>
      </div>
      <DataView
        data={data}
        columns={columns}
        searchPlaceholder="Search staff by name..."
        searchKeys={["name"]}
        filters={[
          {
            columnId: "day",
            title: "Day",
            options: DAYS,
          },
          {
            columnId: "staff",
            title: "Staff",
            options: staffs,
          },
          {
            columnId: "month",
            title: "Month",
            options: months.map((month) => ({
              value: month,
              label: month,
            })),
          },
          {
            columnId: "year",
            title: "Year",
            options: [
              {
                value: 2025,
                label: 2025,
              },
            ],
          },
        ]}
        presetFilters={presetFilters}
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
