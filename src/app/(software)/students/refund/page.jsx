import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import StudentsRefundClientPage from "./components/StudentsRefund";

export default function StudentsRefundPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <StudentsRefundClientPage />
    </Suspense>
  );
}
