"use client";

import { LoginForm } from "@/components/sections/login/login-form";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page() {
  return (
    <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-2">
          <LoginForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking sign in, you agree to our{" "}
            <a
              href="/terms"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div
        className={cn(
          "bg-primary/20 relative h-full overflow-hidden max-lg:hidden flex items-center justify-center"
        )}
      >
        <Image
          src={"/login_bg.svg"}
          className="w-[600px] h-auto"
          width={724}
          height={851}
          alt="Login Background"
        />
      </div>
    </div>
  );
}

// <div className="relative flex items-center justify-center w-full h-screen flex-col gap-6 overflow-hidden">
//   {/* Background Image with Grayscale */}

//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black/50 z-10" />

//   {/* Foreground Content */}
//   <div className="relative z-20">
//   </div>
// </div>;
