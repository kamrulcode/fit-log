"use client";

import Image from "next/image";
import Link from "next/link";
import { XIcon, CheckIcon, StarIcon, FlameIcon, ClockIcon } from "lucide-react";

import { WorkoutsT } from "@/types/workout";

type PlanWorkoutCardProps = {
  workout: WorkoutsT;
  onRemove: () => void;
  done?: boolean;
  onDone?: () => void;
};

const PlanWorkoutCard = ({
  workout,
  done,
  onRemove,
  onDone,
}: PlanWorkoutCardProps) => {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-[#15181e] p-4 sm:flex-row sm:items-center ${done ? "border-[#caff00]/40" : "border-[#292e37]"}`}
    >
      <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="160px"
          className={`object-cover ${done ? "opacity-60" : ""}`}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`font-Oswald text-base font-bold uppercase ${done ? "text-[#aeb4be] line-through" : "text-white"}`}
          >
            {workout.name}
          </h3>
          {done && (
            <span className="rounded-full bg-[#caff00] px-2 py-1 text-[10px] font-black text-black">
              DONE
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-textS">{workout.equipment}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-textS">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="w-4 h-4 text-action" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FlameIcon className="w-4 h-4 text-action" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <StarIcon className="w-4 h-4 text-action" />
            {workout.rating}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-borderS2 px-4 py-2 text-xs font-normal text-cWhite hover:bg-[#1b1f26]"
        >
          View Details
        </Link>
        {onDone && (
          <button
            disabled={done}
            onClick={onDone}
            className="flex items-center gap-1.5 rounded-full bg-action px-3 py-1 text-xs font-semibold text-black disabled:opacity-40"
          >
            <CheckIcon className="w-4 h-4" />
            Mark as Done
          </button>
        )}
        {onRemove && (
          <button
            onClick={onRemove}
            aria-label="Remove workout"
            className="grid h-9 w-9 place-items-center rounded-lg  text-textP hover:text-red-400"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </article>
  );
};

export default PlanWorkoutCard;
