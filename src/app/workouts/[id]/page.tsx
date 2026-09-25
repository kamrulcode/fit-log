import Image from "next/image";
import Link from "next/link";

import WorkoutActions from "./WorkoutActions";

import { WorkoutsT } from "@/types/workout";
import { notFound } from "next/navigation";

type WorkoutDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) notFound();

  const workout: WorkoutsT = await response.json();

  return (
    <main className="min-h-screen bg-cBlack text-white">
      <div className="mx-auto max-w-7xl sm:px-5 px-2 sm:py-10 py-5">
        <Link
          href="/"
          className="sm:text-sm text-xs text-gray-400 hover:text-white"
        >
          ← BACK TO WORKOUTS
        </Link>

        <div className="sm:mt-8 mt-4 grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div>
            <Image
              src={workout.image}
              alt={workout.name}
              width={1000}
              height={1000}
              className="w-full md:h-190 h-80 rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h1 className="font-Oswald md:text-5xl sm:text-4xl text-2xl font-bold uppercase tracking-tight">
              {workout.name}
            </h1>
            <p className="mt-3 max-w-2xl sm:text-base text-xs sm:leading-7 leading-4 text-textP">
              {workout.description}
            </p>
            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-action sm:px-3.5 px-2 sm:py-1 py-.5 sm:text-xs text-[10px] font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="sm:mt-7 mt-5 overflow-hidden rounded-2xl border border-[#292e37] bg-[#15181e] ">
              <Row label="EQUIPMENT" value={workout.equipment} />
              <Row label="DIFFICULTY" value={workout.difficulty} />
              <Row label="SETS" value={`${workout.sets}`} />
              <Row label="REPS" value={workout.reps} />
              <Row label="DURATION" value={`${workout.duration} min`} />
              <Row label="CALORIES" value={`${workout.caloriesBurned} kcal`} />
              <Row label="RATING" value={`${workout.rating}`} last />
            </div>
            {/* instruction  */}

            <section className="mt-8">
              <h2 className="sm:text-lg text-sm font-extrabold tracking-wide">
                INSTRUCTIONS
              </h2>
              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, i) => (
                  <li
                    key={instruction}
                    className="flex sm:gap-4 gap-2 sm:text-sm text-xs sm:leading-6 leading-4 text-[#c3c7ce]"
                  >
                    <span className="shrink-0 text-[#8d949e]">{i + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* IMPORTANT */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;

function Row({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-h-12.25 items-center justify-between gap-5 sm:px-6 px-4 py-3.5   ${!last ? "border-b border-cardBorder" : ""}`}
    >
      <span className="sm:text-xs text-[11px] font-bold tracking-wide text-textP">
        {label}
      </span>
      <span className="text-right sm:text-sm text-[11px] text-[#e5e7eb]">
        {value}
      </span>
    </div>
  );
}
