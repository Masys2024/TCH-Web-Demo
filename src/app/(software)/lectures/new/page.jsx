"use client";

import { parseTimetableData } from "@/utils/parseTimetable";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import remappingWithDB from "@/lib/remapping-with-db";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { fetchTeachers } from "@/lib/apis/teachers";
import { fetchSubjects } from "@/lib/apis/subjects";
import { fetchRooms } from "@/lib/apis/rooms";
import { fetchBatches } from "@/lib/apis/batches";
import { createSchedules } from "@/lib/apis/lectureSchedules";
import TimeTableCard from "@/components/blocks/timetable/time-table-card";
import transformToTimetableLayout from "@/lib/transform-to-timetable";
import { fetchBranches } from "@/lib/apis/branches";
import { fetchStandards } from "@/lib/apis/standards";
import Loader from "@/components/ui/loader";
import Link from "next/link";
import { INTERNAL_LINKS } from "@/constants/navLinks";

export default function TimetableUploader() {
  const [errorText, setErrorText] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [timetableData, setTimetableData] = useState(null);
  const [haveError, setHaveError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [standards, setStandards] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.allSettled([
          fetchTeachers(),
          fetchSubjects(),
          fetchRooms(),
          fetchBatches(),
          fetchBranches(),
          fetchStandards(),
        ]);

        const [
          teachers_data,
          subjects_data,
          rooms_data,
          batches_data,
          branches_data,
          standards_data,
        ] = results;

        if (teachers_data?.value?.returncode === 200) {
          setTeachers(teachers_data?.value?.output);
        }
        if (subjects_data?.value?.returncode === 200) {
          setSubjects(subjects_data?.value?.output);
        }
        if (rooms_data?.value?.returncode === 200) {
          setRooms(rooms_data?.value?.output);
        }
        if (batches_data?.value?.returncode === 200) {
          setBatches(batches_data?.value?.output);
        }
        if (branches_data?.value?.returncode === 200) {
          setBranches(branches_data?.value?.output);
        }
        if (standards_data?.value?.returncode === 200) {
          setStandards(standards_data?.value?.output);
        }
      } catch (error) {
        toast.error("Error Fetching Details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = "Time Table"; // Adjust if needed
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        try {
          if (sheetData?.length <= 0) {
            throw new Error(
              "Sheet not Found, please download proper sheet using Download"
            );
          }
          const parsed = parseTimetableData(sheetData);
          console.log(parsed);

          const remapped = remappingWithDB(parsed, {
            TEACHERS: teachers,
            ROOMS: rooms,
            SUBJECTS: subjects,
            BATCHES: batches,
            BRANCHES: branches,
            STANDARDS: standards,
          });
          const timeTableFormat = transformToTimetableLayout(remapped);
          checkError(timeTableFormat.data);
          setTimetableData(timeTableFormat);
          setJsonData(remapped);
        } catch (error) {
          setHaveError(true);
          setErrorText(`${error.message}`);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const checkError = (data) => {
    data.map((item) => {
      if (item?.day?.isError) {
        setHaveError(true);
      }
      if (item?.date?.isError) {
        setHaveError(true);
      }
      item?.batches?.map((batch) => {
        if (batch?.batch?.isError) {
          setHaveError(true);
        }
        if (batch?.teacher?.isError) {
          setHaveError(true);
        }
        if (batch?.subject?.isError) {
          setHaveError(true);
        }
        if (batch?.time_in?.isError) {
          setHaveError(true);
        }
        if (batch?.time_out?.isError) {
          setHaveError(true);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    try {
      await toast.promise(
        () => {
          jsonData.forEach(async (data) => {
            const batchId = batches?.find(
              (b) => b.code === data.batch.value
            )?.id;
            const branchId = branches?.find(
              (b) => b.code === data.branch.value
            )?.id;
            const standardId = standards?.find(
              (s) => s.code === data.standard.value
            )?.id;
            const teacherId = teachers?.find(
              (t) => t.code === data.teacher.value
            )?.id;
            const subjectId = subjects?.find(
              (s) => s.code === data.subject.value
            )?.id;
            const roomId = rooms?.find(
              (r) => r.code === String(data.room.value)
            )?.id;

            const formData = {
              date: data.date.value,
              day: data.day.value,
              time_in: data.time_in.value,
              time_out: data.time_out.value,
              topic: data.topic.value,
              ...(batchId && { batch: batchId }),
              ...(branchId && { branch: branchId }),
              ...(standardId && { standard: standardId }),
              ...(teacherId && { teacher: teacherId }),
              ...(subjectId && { subject: subjectId }),
              ...(roomId && { room: roomId }),
            };
            console.log(formData);

            await createSchedules(formData);
          });
        },
        {
          loading: "Uploading lectures...",
          success: () => {
            return "All Lectures uploaded.";
          },
          error: "Error uploading data.",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Error Uploading Schedule");
    } finally {
      setLoadingState(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Card className="container mx-auto p-4 mt-4">
      <CardHeader>
        <CardTitle className={"text-2xl"}>
          Upload Timetable Excel File
        </CardTitle>
        <CardAction className={"flex items-center gap-4"}>
          <SampleExcelDownload />
          <Link href={INTERNAL_LINKS.VIEW_LECTURES}>
            <Button>
              View <ArrowUpRight className="size-4" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

        {errorText && (
          <h1 className="text-xl font-semibold text-center text-destructive bg-destructive/10 p-4 mt-6">
            {errorText}
          </h1>
        )}

        <div className="container mt-20 grid gap-4">
          {timetableData?.data?.map((item, index) => (
            <TimeTableCard key={index} info={item} />
          ))}
        </div>

        {!haveError && timetableData?.data && (
          <Button
            disabled={loadingState}
            onClick={handleSubmit}
            className={"w-full mt-4"}
          >
            Upload <Upload className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

const SampleExcelDownload = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/sample/input_sample.xlsx"; // Make sure this file is in your public folder
    link.download = "sample.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant={"outline"} onClick={handleDownload}>
      Download Sample <Download />
    </Button>
  );
};
