"use client";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const { plan, saved } = usePlan();
  return (
    <nav className="border-b border-gray-800 bg-[#0d0f12]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white">
          <Image src={Logo} alt="logo" />

          <span>FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-lime-400">
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-medium text-gray-400 hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-4 py-2 text-xs font-bold text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-gray-600 px-4 py-2 text-xs font-bold text-gray-300"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
