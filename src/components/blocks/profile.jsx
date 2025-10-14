import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { INTERNAL_LINKS } from "@/constants/navLinks";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePopover() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push(INTERNAL_LINKS.LOGIN);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="@shadcn"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="flex items-center space-x-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="@shadcn"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-xs text-muted-foreground">shadcn@example.com</p>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="grid gap-1">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Separator className="my-1" />
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
