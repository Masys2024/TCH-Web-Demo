import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function TimeTableCard({ info }) {
  return (
    <Card className="p-0">
      <Table className="text-center">
        <TableHeader>
          <TableRow>
            <TableHead
              colSpan={9}
              className={cn(
                "text-center text-lg font-semibold space-y-1 p-2",
                info.day.isError && "text-destructive bg-destructive/10"
              )}
            >
              <CardTitle>{info.day.value}</CardTitle>
              {info.day.isError && (
                <CardDescription className={"text-destructive/50 text-sm"}>
                  {info.day.errorMsg}
                </CardDescription>
              )}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead
              colSpan={9}
              className={cn(
                "text-center text-lg font-semibold space-y-1 p-2",
                info.date.isError && "text-destructive bg-destructive/10"
              )}
            >
              <CardTitle>{info.date.value}</CardTitle>
              {info.date.isError && (
                <CardDescription className={"text-destructive/50 text-sm"}>
                  {info.date.errorMsg}
                </CardDescription>
              )}
            </TableHead>
          </TableRow>

          {/* Column headers */}
          <TableRow>
            <TableHead className={"border text-center"}>Branch</TableHead>
            <TableHead className={"border text-center"}>Standard</TableHead>
            <TableHead className={"border text-center"}>Batch</TableHead>
            <TableHead colSpan={2} className={"border text-center"}>
              Time
            </TableHead>
            <TableHead className={"border text-center"}>Teacher</TableHead>
            <TableHead className={"border text-center"}>Subject</TableHead>
            <TableHead className={"border text-center"}>Topic</TableHead>
            <TableHead className={"border text-center"}>Room</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {info?.batches?.map((item, index) => (
            <TableRow key={index}>
              {/* Branch */}
              <TableCell
                className={cn(
                  "border",
                  item.branch.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.branch.value}</span>
                  {item.branch.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.branch.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Standard */}
              <TableCell
                className={cn(
                  "border",
                  item.standard.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.standard.value}</span>
                  {item.standard.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.standard.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Batch */}
              <TableCell
                className={cn(
                  "border",
                  item.batch.isError && "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.batch.value}</span>
                  {item.batch.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.batch.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Time In */}
              <TableCell
                className={cn(
                  "border",
                  item.time_in.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.time_in.value}</span>
                  {item.time_in.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.time_in.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Time Out */}
              <TableCell
                className={cn(
                  "border",
                  item.time_out.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.time_out.value}</span>
                  {item.time_out.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.time_out.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Teacher */}
              <TableCell
                className={cn(
                  "border",
                  item.teacher.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.teacher.value}</span>
                  {item.teacher.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.teacher.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Subject */}
              <TableCell
                className={cn(
                  "border",
                  item.subject.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.subject.value}</span>
                  {item.subject.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.subject.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Topic */}
              <TableCell
                className={cn(
                  "flex items-center justify-center",
                  item?.topic?.isError &&
                    "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1 w-[220px] whitespace-normal break-words text-center">
                  <span>{item?.topic?.value}</span>
                  {item?.topic?.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item?.topic?.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>

              {/* Room */}
              <TableCell
                className={cn(
                  "border",
                  item.room.isError && "text-destructive bg-destructive/10 p-2"
                )}
              >
                <div className="grid space-y-1">
                  <span>{item.room.value}</span>
                  {item.room.isError && (
                    <span className="text-destructive/50 text-xs">
                      {item.room.errorMsg}
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
