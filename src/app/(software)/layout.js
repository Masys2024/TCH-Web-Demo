import Navbar from "@/components/blocks/navbar";
import NAVLINKS from "@/constants/navLinks";

export default function SoftwareLayout({ children }) {
  return (
    <>
      <Navbar navigationItems={NAVLINKS} />
      <main className="pt-20">{children}</main>
    </>
  );
}
