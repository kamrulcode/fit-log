import Image from "next/image";
import fLogo from "@/assets/footerLogo.svg";

export default function Footer() {
  return (
    <footer className="border-t border-[#20242b] bg-[#0d0f12]">
      <div className="mx-auto flex max-w-310 flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-2 font-black">
          <Image src={fLogo} alt="footer logo" />
          FITLOG
        </div>
        <p className="text-[#69717d]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
