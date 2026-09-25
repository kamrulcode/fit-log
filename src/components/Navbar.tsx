"use client";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  return (
    <header className="mb-12 border-b border-menuBorder">
      <div className="mx-auto flex max-w-310 navbar  shadow-sm  h-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <Link
                className={`py-1.5 px-4 text-xs font-semibold leading-4 ${pathname === "/" ? "font-bold text-action rounded-full bg-menuBack" : "text-textP"}`}
                href="/"
              >
                Workouts
              </Link>
              <Link
                className={`py-1.5 px-4 text-xs font-semibold leading-4 ${pathname === "/my-plan" ? "font-bold text-action rounded-full bg-menuBack" : "text-textP"}`}
                href="/my-plan"
              >
                My Plan
              </Link>
            </ul>
          </div>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-black text-white text-lg tracking-widest leading-7 font-Oswald"
          >
            <Image src={Logo} alt="logo" className="w-7 h-7" />
            <span>FITLOG</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link
              className={` py-1.5 px-4 text-xs font-semibold leading-4 ${pathname === "/" ? "font-bold text-action rounded-full bg-menuBack" : "text-textP"}`}
              href="/"
            >
              Workouts
            </Link>
            <Link
              className={`py-1.5 px-4 text-xs font-semibold leading-4 ${pathname === "/my-plan" ? "font-bold text-action rounded-full bg-menuBack" : "text-textP"}`}
              href="/my-plan"
            >
              My Plan
            </Link>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#c5c9d0]"
          >
            <span>Plan</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#caff00] px-1 font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?saved=1"
            className="flex items-center gap-2 text-xs text-[#c5c9d0]"
          >
            <span>Saved</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-[#424854] px-1 font-bold text-[#c5c9d0]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
