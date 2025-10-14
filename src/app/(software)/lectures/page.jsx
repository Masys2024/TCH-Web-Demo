import { Suspense } from "react";
import LecturesPageClient from "./components/LecturesPageClient";
import Loader from "@/components/ui/loader";

export default function LecturesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <LecturesPageClient />
    </Suspense>
  );
}
