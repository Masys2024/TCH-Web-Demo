import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import DatePicker from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

export default function DateFilter({ dateFilter, onFilterChange, className }) {
  const handlePresetChange = (preset) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (preset) {
      case "today":
        startDate = endDate = new Date(now.setHours(0, 0, 0, 0));
        break;

      case "thisWeek": {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay() + 1); // Monday
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // Sunday
        startDate = start;
        endDate = end;
        break;
      }

      case "lastWeek": {
        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay() - 6); // Monday last week
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // Sunday last week
        startDate = start;
        endDate = end;
        break;
      }

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
        startDate = new Date(dateFilter.startDate);
        endDate = new Date(dateFilter.endDate);
        break;

      default:
        break;
    }

    onFilterChange({
      ...dateFilter,
      preset,
      startDate,
      endDate,
    });
  };

  const handleDateChange = (field, value) => {
    onFilterChange({
      ...dateFilter,
      [field]: value,
      preset: "custom",
    });
  };

  const handleReset = () => {
    onFilterChange({
      startDate: "",
      endDate: "",
      preset: "week",
    });
  };

  return (
    <>
      <div className={cn(className, "flex flex-wrap gap-4 items-end")}>
        {/* Preset Selector */}
        <Select
          className={className}
          value={dateFilter?.preset}
          onValueChange={handlePresetChange}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="last3Months">Last 3 Months</SelectItem>
            <SelectItem value="last6Months">Last 6 Months</SelectItem>
            <SelectItem value="thisYear">This Year</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {dateFilter?.preset === "custom" && (
          <div className="flex gap-4 items-center">
            {/* Start Date */}
            <div className="flex-1 grid gap-2 min-w-[150px]">
              <Label htmlFor="startDate">Start Date</Label>
              <DatePicker
                id="startDate"
                date={dateFilter?.startDate}
                setDate={(value) => handleDateChange("startDate", value)}
                placeholder="Select Start Date"
              />
            </div>

            {/* End Date */}
            <div className="flex-1 grid gap-2 min-w-[150px]">
              <Label htmlFor="endDate">End Date</Label>
              <DatePicker
                id="endDate"
                date={dateFilter?.endDate}
                setDate={(value) => handleDateChange("endDate", value)}
                placeholder="Select End Date"
              />
            </div>
          </div>
        )}
        {/* Reset Button */}
        {/*
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          title="Reset to default (Last 7 days)"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        */}
      </div>
    </>
  );
}
