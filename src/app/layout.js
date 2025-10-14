import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

const font = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "i-Class | No.1 Software App for Class Management",
    template: "%s | i-Class",
  },
  description:
    "i-class  is a Advanced Cloud-based Platform, an Integrated Mobile App, This App is the No. 1 Software App for Class Management in Mumbai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={`${font.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
