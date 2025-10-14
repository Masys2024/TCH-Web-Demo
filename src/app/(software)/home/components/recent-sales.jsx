"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Rahul Deshmukh</p>
            <p className="text-muted-foreground text-sm">
              Mathematics Test Submission
            </p>
          </div>
          <div className="text-sm text-muted-foreground">5m ago</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Shweta Patil</p>
            <p className="text-muted-foreground text-sm">
              Fees Payment - Term 2
            </p>
          </div>
          <div className="text-sm text-muted-foreground">15m ago</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Amit Kumar</p>
            <p className="text-muted-foreground text-sm">
              Physics Assignment Graded
            </p>
          </div>
          <div className="text-sm text-muted-foreground">1h ago</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Priya Joshi</p>
            <p className="text-muted-foreground text-sm">
              Attendance Marked - Present
            </p>
          </div>
          <div className="text-sm text-muted-foreground">2h ago</div>
        </div>
      </div>
    </div>
  );
}
