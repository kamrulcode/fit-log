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
    <main className="min-h-screen bg-[#0d0f12] text-white">
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
              width={800}
              height={600}
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-bold uppercase text-lime-400">
              {workout.difficulty}
            </p>

            <h1 className="mt-3 text-4xl font-black">{workout.name}</h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-300"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-gray-800 bg-[#15181d] p-4">
                <p className="text-xs text-gray-500">EQUIPMENT</p>

                <p className="mt-2 text-sm font-bold">{workout.equipment}</p>
              </div>

              <div className="rounded-lg border border-gray-800 bg-[#15181d] p-4">
                <p className="text-xs text-gray-500">DURATION</p>

                <p className="mt-2 text-sm font-bold">{workout.duration} min</p>
              </div>

              <div className="rounded-lg border border-gray-800 bg-[#15181d] p-4">
                <p className="text-xs text-gray-500">CALORIES</p>

                <p className="mt-2 text-sm font-bold">
                  {workout.caloriesBurned}
                </p>
              </div>

              <div className="rounded-lg border border-gray-800 bg-[#15181d] p-4">
                <p className="text-xs text-gray-500">RATING</p>

                <p className="mt-2 text-sm font-bold">{workout.rating}</p>
              </div>
            </div>

            {/* IMPORTANT */}
            <WorkoutActions workout={workout} />
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-16">
          <h2 className="text-2xl font-black">HOW TO DO IT</h2>

          <div className="mt-6 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-lg border border-gray-800 bg-[#15181d] p-5"
              >
                <span className="font-black text-lime-400">{index + 1}</span>

                <p className="text-sm leading-6 text-gray-300">{instruction}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;
