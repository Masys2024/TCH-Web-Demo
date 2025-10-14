"use client";

import DateFilter from "@/components/blocks/DateFilter";
import TimeTableCard from "@/components/blocks/timetable/time-table-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import sortScheduleByDate from "@/lib/sortSchedule";
import { transformToTimetableFormat } from "@/lib/transform-to-timetable";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BRANCHES } from "@/constants/data/branches";
import { LECTURES } from "@/constants/data/lectures";
import { useSearchParams } from "next/navigation";

const start_Of_Week = (date) => {
  const d = new Date(date);
  const diff = d.getDate() - d.getDay() + 1; // Monday start
  return new Date(d.setDate(diff));
};

export default function LecturesPageClient() {
  const searchParams = useSearchParams();
  const teacherSearchQuery = searchParams.get("teacher");
  const subjectSearchQuery = searchParams.get("subject");
  const roomSearchQuery = searchParams.get("room");
  const batchSearchQuery = searchParams.get("batch");
  const [originalData, setOriginalData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [Branches, setBranches] = useState([]);

  // Filters

  const [dateFilter, setDateFilter] = useState({
    startDate: start_Of_Week(new Date()),
    endDate: new Date(),
    preset: "thisWeek", // Default to last 7 days
  });
  const [filter, setFilter] = useState({
    teacher: "",
    subject: "",
    room: "",
    batch: "",
    branch: "",
  });

  // Original Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      const schedules_data = LECTURES;
      const branches_data = BRANCHES;
      setOriginalData(schedules_data);
      setBranches(branches_data);
      const startDate = start_Of_Week(new Date());
      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 6,
        23,
        59,
        59,
        999
      );
      setDateFilter({ startDate, endDate, preset: "thisWeek" });
    };

    fetchData();
  }, []);

  // Filters
  useEffect(() => {
    // Date Filter
    let filtered_data = [];
    filtered_data = filterByDatePreset(
      originalData,
      dateFilter?.preset || "thisWeek"
    );

    // Branch Filter
    if (filter.branch) {
      filtered_data = filtered_data?.filter(
        (item) => item?.branches?.code === filter.branch
      );
    }

    // Teacher Filter
    if (filter.teacher || teacherSearchQuery) {
      filtered_data = filtered_data?.filter((item) =>
        item?.teachers?.code?.includes(filter.teacher || teacherSearchQuery)
      );
    }

    // Subject Filter
    if (filter.subject || subjectSearchQuery) {
      filtered_data = filtered_data?.filter((item) =>
        item?.subjects?.code?.includes(filter.subject || subjectSearchQuery)
      );
    }

    // Room Filter
    if (filter.room || roomSearchQuery) {
      filtered_data = filtered_data?.filter((item) =>
        item?.rooms?.code?.includes(filter.room || roomSearchQuery)
      );
    }

    // Batch Filter
    if (filter.batch || batchSearchQuery) {
      filtered_data = filtered_data?.filter((item) =>
        item?.batches?.code?.includes(filter.batch || batchSearchQuery)
      );
    }

    // Time-table Data Format
    const format_data = transformToTimetableFormat(filtered_data);
    const display_data = sortScheduleByDate(format_data);
    setDisplayData(display_data?.data || []);
  }, [
    dateFilter.preset,
    dateFilter.endDate,
    dateFilter.startDate,
    filter.teacher,
    filter.subject,
    filter.room,
    filter.batch,
    filter.branch,
    roomSearchQuery,
    teacherSearchQuery,
    batchSearchQuery,
    subjectSearchQuery,
  ]);

  const filterByDatePreset = (data, preset) => {
    const now = new Date();
    let startDate, endDate;

    const startOfWeek = (date) => {
      const d = new Date(date);
      const day = d.getDay(); // 0 (Sun) - 6 (Sat)
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust so Monday is start
      return new Date(d.setDate(diff));
    };

    const endOfWeek = (date) => {
      const start = startOfWeek(date);
      const end = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 6,
        23,
        59,
        59,
        999
      );
      return end;
    };

    switch (preset) {
      case "today":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          0,
          0,
          0,
          0
        );
        endDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59,
          999
        );
        break;

      case "thisWeek":
        startDate = startOfWeek(now);
        endDate = endOfWeek(now);
        break;

      case "lastWeek":
        const lastWeekDate = new Date(now);
        lastWeekDate.setDate(now.getDate() - 7);
        startDate = startOfWeek(lastWeekDate);
        endDate = endOfWeek(lastWeekDate);
        break;

      case "thisMonth":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;

      case "lastMonth":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;

      case "last3Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;

      case "last6Months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;

      case "thisYear":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;

      case "lastYear":
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;

      case "custom":
        startDate = dateFilter.startDate;
        endDate = dateFilter.endDate;
        break;
    }

    // Ensure times are set properly
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    console.log("Filtering between:", startDate, endDate);

    return data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  return (
    <div className="container mx-auto p-6 grid gap-4">
      <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lectures</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of Lectures
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filter.branch}
            onValueChange={(value) => setFilter({ ...filter, branch: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Branches</SelectLabel>
                {Branches.map((branch, idx) => (
                  <SelectItem key={idx} value={branch?.code}>
                    <h3 className="font-semibold">{branch.code}</h3>
                    <h4 className="text-xs text-muted-foreground">
                      {branch.name}
                    </h4>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DateFilter dateFilter={dateFilter} onFilterChange={setDateFilter} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Date */}
        <div className="w-full space-y-1">
          <h1 className="text-sm font-semibold">Search By Teacher</h1>
          <Input
            type={"text"}
            value={filter.teacher}
            onChange={(e) => setFilter({ ...filter, teacher: e.target.value })}
            placeholder="Search By Teacher..."
          />
        </div>
        <div className="w-full space-y-1">
          <h1 className="text-sm font-semibold">Search By Subject</h1>
          <Input
            type={"text"}
            value={filter.subject}
            onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
            placeholder="Search By Subject..."
          />
        </div>
        <div className="w-full space-y-1">
          <h1 className="text-sm font-semibold">Search By Room</h1>
          <Input
            type={"text"}
            value={filter.room}
            onChange={(e) => setFilter({ ...filter, room: e.target.value })}
            placeholder="Search By Room..."
          />
        </div>
        <div className="w-full space-y-1">
          <h1 className="text-sm font-semibold">Search By Batches</h1>
          <Input
            type={"text"}
            value={filter.batch}
            onChange={(e) => setFilter({ ...filter, batch: e.target.value })}
            placeholder="Search By Batch..."
          />
        </div>
      </div>

      <Separator className={"my-4"} />

      <div className="container mt-10 grid grid-cols-1 gap-4">
        {displayData?.map((item, index) => (
          <TimeTableCard key={index} info={item} />
        ))}
      </div>
    </div>
  );
}
