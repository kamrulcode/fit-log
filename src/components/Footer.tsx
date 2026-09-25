import Image from "next/image";
import fLogo from "@/assets/footerLogo.svg";

export default function Footer() {
  return (
    <footer className="border-t border-footerBorder bg-footerBack sm:mt-16 mt-10">
      <div className="mx-auto flex max-w-310 flex-col gap-4 px-5  text-sm sm:flex-row sm:items-center sm:justify-between md:px-8 py-10">
        <div className="flex items-center gap-2 font-bold font-Oswald tracking-wide">
          <Image src={fLogo} alt="footer logo" />
          FITLOG
        </div>
        <p className="text-xs text-footerT font-normal leading-4">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
