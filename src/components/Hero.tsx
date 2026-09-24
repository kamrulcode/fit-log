import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Banner from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="grid items-center gap-10 py-12 lg:grid-cols-2">
      {/* Left */}
      <div>
        <p className="mb-4 text-sm font-bold tracking-widest text-lime-400">
          WORKOUT LIBRARY
        </p>

        <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>

        <p className="mt-5 max-w-xl text-gray-400">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <Link
          href="#library"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black hover:bg-lime-300"
        >
          BROWSE WORKOUTS
          <ArrowDown size={18} />
        </Link>
      </div>

      {/* Right */}
      <div className="relative h-100 overflow-hidden rounded-2xl">
        <Image src={Banner} alt="Gym workout" />
      </div>
    </section>
  );
};

export default Hero;
