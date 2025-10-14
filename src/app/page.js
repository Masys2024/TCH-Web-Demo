"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    if (router) {
      handleUnauthorizedAccess();
    }
  }, [router]);

  const handleUnauthorizedAccess = () => {
    // Perform checks for user authentication
    const isAuthenticated = false; // Replace with your actual authentication logic

    if (!isAuthenticated) {
      router.push("/login"); // Redirect to the login page
    }
  };

  return null;
}
