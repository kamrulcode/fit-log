"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, X, Check } from "lucide-react";

import { WorkoutsT } from "@/types/workout";

type PlanWorkoutCardProps = {
  workout: WorkoutsT;
  onRemove: () => void;
  onDone?: () => void;
  showDone?: boolean;
};

const PlanWorkoutCard = ({
  workout,
  onRemove,
  onDone,
  showDone = true,
}: PlanWorkoutCardProps) => {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#15181d] sm:flex-row">
      {/* Image */}
      <div className="relative h-52 w-full shrink-0 sm:h-auto sm:w-56">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Top */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-lime-400">
                {workout.difficulty}
              </p>

              <h3 className="mt-1 text-xl font-black text-white">
                {workout.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>
            </div>

            {/* Remove */}
            <button
              onClick={onRemove}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-800 hover:text-white"
              aria-label={`Remove ${workout.name}`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {workout.duration} min
            </div>

            <div className="flex items-center gap-1.5">
              <Flame className="h-4 w-4" />
              {workout.caloriesBurned} cal
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4" />
              {workout.rating}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/workouts/${workout.id}`}
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-bold text-white transition hover:border-gray-500"
          >
            VIEW DETAILS
          </Link>

          {showDone && onDone && (
            <button
              onClick={onDone}
              className="flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300"
            >
              <Check className="h-4 w-4" />
              MARK AS DONE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;
