import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Banner from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="grid items-center gap-10 p-14 md:grid-cols-2 bg-cardBack rounded-2xl border border-cardBorder sm:mb-16 mb-10">
      {/* Left */}
      <div className="sm:text-start text-center">
        <p className="sm:mb-4 mb-2 sm:text-[11px] text-[9px] font-bold tracking-widest text-action ">
          WORKOUT LIBRARY
        </p>

        <h1 className="sm:text-5xl text-2xl font-extrabold  sm:leading-15 leading-8 tracking-tighter text-white md:text-6xl font-Oswald">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p className="sm:mt-5 mt-4 max-w-xl text-textP sm:text-base text-[13px] font-normal sm:leading-6 leading-4">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <Link
          href="#library"
          className="sm:mt-7 mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-400 sm:px-6 px-4 sm:py-3 py-2 sm:text-xs text-[10px] font-bold text-black hover:bg-lime-300 scroll-smooth"
        >
          BROWSE WORKOUTS
          <ArrowRight className="sm:w-4.5 w-3.5" />
        </Link>
      </div>

      {/* Right */}
      <div className=" flex md:justify-end overflow-hidden rounded-2xl justify-center">
        <Image src={Banner} alt="Gym workout" />
      </div>
    </section>
  );
};

export default Hero;
