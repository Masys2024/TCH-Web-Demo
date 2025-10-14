"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function StudentProfilePage() {
  const { id } = useParams();
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
