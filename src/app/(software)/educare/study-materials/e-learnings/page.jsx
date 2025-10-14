import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { CircleFadingPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ELearningsPage() {
  return (
    <section className="p-6 max-w-7xl mx-auto">
      <div className="w-full pb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">E-Learning Videos</h1>
        <Link href={INTERNAL_LINKS.ADD_E_LEARNING}>
          <Button>
            Add <CircleFadingPlus className="size-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
