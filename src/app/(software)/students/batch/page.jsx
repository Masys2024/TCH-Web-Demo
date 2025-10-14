import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BATCH_WISE_STUDENTS } from "@/constants/data/batch_wise_students";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BatchWiseStudents() {
  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">Batch Summary</h1>
        {/* <Link href={INTERNAL_LINKS.ADD_STUDENT}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link> */}
      </div>
      <Card>
        <Separator />
        <CardContent>
          {BATCH_WISE_STUDENTS?.map((batch, idx) => (
            <Card key={idx} className={"p-0 my-4 overflow-hidden"}>
              <CardHeader
                className={
                  "flex items-center justify-between gap-4 bg-muted px-4 py-2 border-b"
                }
              >
                <CardTitle>{batch?.Std_Name}</CardTitle>
                <CardTitle>Batches: {batch?.Batch?.length}</CardTitle>
              </CardHeader>
              <CardContent className={"pb-4 grid gap-2"}>
                {batch?.Batch?.map((b, idx) => (
                  <div
                    key={idx}
                    className="space-y-4 grid grid-cols-6 items-center gap-4"
                  >
                    <h4 className="col-span-2">Batch: {b?.Batch_Name}</h4>
                    <h4>Boys: {b?.TotalBoys}</h4>
                    <h4>Girls: {b?.TotalGirls}</h4>
                    <h4>Unspecified: {b?.Unspecified}</h4>
                    <div className="flex items-start gap-4 -mt-4">
                      <h4>Total: {b?.TotalStudent}</h4>
                      <Link
                        href={`/students/active/?standard=${batch?.Std_Name}&batch=${b?.Batch_Name}`}
                      >
                        <ExternalLink className="w-4 h-4 hover:w-5 hover:h-5  transition-all duration-300 text-primary" />
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
