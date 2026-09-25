import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

import { WorkoutsT } from "@/types/workout";

interface WorkoutCardProps {
  workout: WorkoutsT;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-gray-800 bg-[#15181d]"
    >
      {/* Image */}
      <div className="relative h-56">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-action px-2.5 py-.5 text-[11px] font-bold text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mt-4 text-lg font-bold text-white font-Oswald">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-xs text-gray-400">{workout.equipment}</p>

        {/* Stats */}
        <div className="mt-5 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={15} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={15} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={15} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
