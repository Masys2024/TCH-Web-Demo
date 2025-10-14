import { Suspense } from "react";
import ActiveStudentsPageClient from "./components/ActivePageClient";
import Loader from "@/components/ui/loader";

export default function ActiveStudentsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <ActiveStudentsPageClient />
    </Suspense>
  );
}
