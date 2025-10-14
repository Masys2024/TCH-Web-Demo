import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatalistMulti } from "@/components/ui/datalist";
import { DAYS } from "@/constants/days";

export default function PayrollDetails({ formData, setFormData }) {
  const [errorText, setErrorText] = useState({
    shift1InTime: "",
    shift1OutTime: "",
    shift2InTime: "",
    shift2OutTime: "",
    secondShiftDays: "",
    weekOff: "",
    singlePunches: "",
    lateHalfDay: "",
    staffType: "",
    payType: "",
    amount: "",
    overTimeConsideration: "",
    deductions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 pb-4">
          {/* Shift 1 In-time */}
          <div className="w-full grid gap-2">
            <Label>Shift 1 Intime</Label>
            <Input
              type={"time"}
              name="shift1InTime"
              value={formData.shift1InTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.shift1InTime}</p>
          </div>

          {/* Shift 1 Out-time */}
          <div className="w-full grid gap-2">
            <Label>Shift 1 Outtime</Label>
            <Input
              type={"time"}
              name="shift2InTime"
              value={formData.shift2InTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">
              {errorText.shift1OutTime}
            </p>
          </div>

          {/* Shift 2 In-time */}
          <div className="w-full grid gap-2">
            <Label>Shift 2 Intime</Label>
            <Input
              type={"time"}
              name="shift2InTime"
              value={formData.shift2InTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.shift2InTime}</p>
          </div>

          {/* Shift 2 Out-time */}
          <div className="w-full grid gap-2">
            <Label>Shift 2 Outtime</Label>
            <Input
              type={"time"}
              name="shift2OutTime"
              value={formData.shift2OutTime}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">
              {errorText.shift2OutTime}
            </p>
          </div>

          {/* Second Shift Days */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>Second Shift Days</Label>
            <DatalistMulti
              options={DAYS}
              value={formData.secondShiftDays}
              onChange={(values) =>
                setFormData({ ...formData, secondShiftDays: values })
              }
              placeholder="Select..."
            />
            <p className="text-xs text-destructive">
              {errorText.secondShiftDays}
            </p>
          </div>

          {/* WeekOff */}
          <div className="w-full grid gap-2 col-span-2">
            <Label>WeekOffs</Label>
            <DatalistMulti
              options={DAYS}
              value={formData.weekOff}
              onChange={(values) =>
                setFormData({ ...formData, weekOff: values })
              }
              placeholder="Select..."
            />
            <p className="text-xs text-destructive">{errorText.weekOff}</p>
          </div>

          {/* Single Punches */}
          <div className="w-full grid gap-2">
            <Label>Single Punches for the day</Label>
            <Select
              value={formData.singlePunches}
              onValueChange={(value) =>
                setFormData({ ...formData, singlePunches: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Allow Single Punches" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Allow Single Punches</SelectLabel>
                  <SelectItem value={true}>Yes</SelectItem>
                  <SelectItem value={false}>No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">
              {errorText.singlePunches}
            </p>
          </div>

          {/* Late / Half Day */}
          <div className="w-full grid gap-2">
            <Label>Late / Half Day</Label>
            <Select
              value={formData.lateHalfDay}
              onValueChange={(value) =>
                setFormData({ ...formData, lateHalfDay: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Late / Half Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Late / Half Day</SelectLabel>
                  <SelectItem value={"Total Working Hours"}>
                    Total Working Hours
                  </SelectItem>
                  <SelectItem value={"Shift Timing"}>Shift Timing</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.lateHalfDay}</p>
          </div>

          {/* Staff Type */}
          <div className="w-full grid gap-2">
            <Label>Staff Type</Label>
            <Select
              value={formData.staffType}
              onValueChange={(value) =>
                setFormData({ ...formData, staffType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Staff Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Staff Type</SelectLabel>
                  <SelectItem value={"Teaching"}>Teaching</SelectItem>
                  <SelectItem value={"Non Teaching"}>Non-Teaching</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.staffType}</p>
          </div>

          {/* Pay Type */}
          <div className="w-full grid gap-2">
            <Label>Pay Type</Label>
            <Select
              value={formData.payType}
              onValueChange={(value) =>
                setFormData({ ...formData, payType: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pay Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pay Type</SelectLabel>
                  <SelectItem value={"Fixed"}>Fixed</SelectItem>
                  <SelectItem value={"Hourly"}>Hourly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.payType}</p>
          </div>

          {/* Amount */}
          <div className="w-full grid gap-2">
            <Label>Amount</Label>
            <Input
              type={"number"}
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <p className="text-xs text-destructive">{errorText.amount}</p>
          </div>

          {/* Overtime Considerations */}
          <div className="w-full grid gap-2">
            <Label>Overtime Considerations</Label>
            <Select
              value={formData.overTimeConsideration}
              onValueChange={(value) =>
                setFormData({ ...formData, overTimeConsideration: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Overtime Considerations" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Overtime Considerations</SelectLabel>
                  <SelectItem value={true}>Yes</SelectItem>
                  <SelectItem value={false}>No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">
              {errorText.overTimeConsideration}
            </p>
          </div>

          {/* Deductions */}
          <div className="w-full grid gap-2">
            <Label>Deductions</Label>
            <Select
              value={formData.deductions}
              onValueChange={(value) =>
                setFormData({ ...formData, deductions: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Deductions" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Deductions</SelectLabel>
                  <SelectItem value={true}>Yes</SelectItem>
                  <SelectItem value={false}>No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">{errorText.deductions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
