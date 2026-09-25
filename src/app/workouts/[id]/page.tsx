import Image from "next/image";
import Link from "next/link";

import WorkoutActions from "./WorkoutActions";

import { WorkoutsT } from "@/types/workout";

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

  if (!response.ok) {
    return (
      <div className="min-h-screen bg-[#0d0f12] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h1 className="text-3xl font-black">WORKOUT NOT FOUND</h1>

          <Link href="/" className="mt-6 inline-block text-lime-400">
            ← Back to workouts
          </Link>
        </div>
      </div>
    );
  }

  const workout: WorkoutsT = await response.json();

  return (
    <main className="min-h-screen bg-cBlack text-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-white">
          ← BACK TO WORKOUTS
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div>
            <Image
              src={workout.image}
              alt={workout.name}
              width={1000}
              height={1000}
              className="w-full h-190 rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h1 className="font-Oswald text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-textP">
              {workout.description}
            </p>
            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#caff00] px-3.5 py-1 text-xs font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-[#292e37] bg-[#15181e]">
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
              <h2 className="text-lg font-extrabold tracking-wide">
                INSTRUCTIONS
              </h2>
              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, i) => (
                  <li
                    key={instruction}
                    className="flex gap-4 text-sm leading-6 text-[#c3c7ce]"
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
      className={`flex min-h-12.25 items-center justify-between gap-5 px-6 py-3.5 ${!last ? "border-b border-cardBorder" : ""}`}
    >
      <span className="text-xs font-bold tracking-wide text-textP">
        {label}
      </span>
      <span className="text-right text-sm text-[#e5e7eb]">{value}</span>
    </div>
  );
}
