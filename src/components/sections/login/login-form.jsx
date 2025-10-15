import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
// import { useAuth } from "@/contexts/AuthContext";
import { LoginLogo } from "@/components/blocks/logo";
import { useRouter } from "next/navigation";
import { INTERNAL_LINKS } from "@/constants/navLinks";

export function LoginForm({ className, ...props }) {
  // const { Login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    pass: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.setItem("isLoggedIn", true);
      await toast.promise(sleep(2000), {
        loading: "Signing in...",
        success: () => {
          if (!formData.username === "admin" && !formData.pass === "admin") {
            router.push(INTERNAL_LINKS.ACTIVE_STUDENTS);
            return `Welcome back, ${formData.username}!`;
          } else {
            throw new Error("User Not Found");
          }
        },
        error: "User Not Found",
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="w-full pb-4">
        <LoginLogo />
      </div>
      <CardTitle>Sign in to your account</CardTitle>
      <CardDescription>
        Enter your email and password below <br />
        to log into your account
      </CardDescription>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="johndoe"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-3">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                value={formData.pass}
                onChange={(e) =>
                  setFormData({ ...formData, pass: e.target.value })
                }
                placeholder="******"
                required
              />
              {showPass ? (
                <Eye size={18} onClick={() => setShowPass(false)} />
              ) : (
                <EyeOff size={18} onClick={() => setShowPass(true)} />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button disabled={loading} type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
