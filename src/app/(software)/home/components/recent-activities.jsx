"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  const activities = [
    {
      name: "Rahul Deshmukh",
      activity: "Mathematics Test Submission",
      time: "5m ago",
      initials: "RD",
    },
    {
      name: "Shweta Patil",
      activity: "Fees Payment - Term 2",
      time: "15m ago",
      initials: "SP",
    },
    {
      name: "Amit Kumar",
      activity: "Physics Assignment Graded",
      time: "1h ago",
      initials: "AK",
    },
    {
      name: "Priya Joshi",
      activity: "Attendance Marked - Present",
      time: "2h ago",
      initials: "PJ",
    },
  ];

  return (
    <div className="space-y-4">
      {activities.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-wrap items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm leading-none font-medium">{item.name}</p>
              <p className="text-muted-foreground text-sm">{item.activity}</p>
            </div>
            <div className="text-sm text-muted-foreground">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
