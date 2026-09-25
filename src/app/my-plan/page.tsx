"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import PlanWorkoutCard from "@/components/PlanWorkoutCard";

import { usePlan } from "@/context/PlanContext";
import { successToast } from "@/components/toast";

type Tab = "plan" | "saved";

type SortOption = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const { plan, saved, removeFromPlan, removeFromSaved, markDone } = usePlan();

  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [currentWorkouts, sortBy]);

  // Today's plan metrics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);

      successToast("Workout removed from your plan");
    } else {
      removeFromSaved(id);

      successToast("Removed from saved");
    }
  };

  return (
    <div className="min-h-screen bg-cBlack text-white">
      <main className="px-5 sm:py-10 py-5">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div>
            <h1 className="sm:text-3xl text-xl font-bold font-Oswald leading-9 tracking-tighter">
              MY PLAN
            </h1>

            <p className="mt-2 text-sm text-textP">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Metrics */}
          <div className="sm:mt-8 mt-5 grid  gap-4 grid-cols-3 rounded-xl border border-gray-800 bg-[#15181d] p-5 sm:text-4xl text-2xl">
            <div className=" sm:pl-8 pl-4">
              <p className="text-sm text-gray-400">Exercises</p>

              <p className="mt-2 font-bold font-Oswald text-action">
                {plan.length}
              </p>
            </div>

            <div className="border-l border-borderS pl-8">
              <p className="text-sm text-gray-400">Minutes</p>

              <p className="mt-2 font-bold font-Oswald">{totalMinutes}</p>
            </div>

            <div className="border-l border-borderS pl-8">
              <p className="text-sm text-gray-400">Calories</p>

              <p className="mt-2  font-bold font-Oswaldfont-Oswald">
                {totalCalories}
              </p>
            </div>
          </div>

          {/* Tabs + Sort */}
          <div className="mt-10 flex flex-col justify-between gap-5  sm:flex-row items-end">
            {/* Tabs */}
            <div className="flex p-1 gap-6 bg-backgroundS border border-borderS sm:text-xs text-[10px] font-normal text-textS rounded-xl">
              <button
                onClick={() => setActiveTab("plan")}
                className={`py-2 px-9  ${activeTab === "plan" ? " bg-backgroundS2 rounded-lg border border-borderS2 shadow-sortBox text-cWhite font-bold" : ""}`}
              >
                TODAY&apos;S PLAN
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`py-2 px-9 ${
                  activeTab === "saved"
                    ? "bg-backgroundS2 rounded-lg border border-borderS2 shadow-sortBox text-cWhite font-bold"
                    : "e"
                }`}
              >
                SAVED
              </button>
            </div>

            {/* Sort */}
            <div className="pb-3 flex gap-3 items-center relative">
              <p className="text-textP text-xs font-normal">Sort By</p>
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="rounded-lg bg-backgroundS border border-borderS text-xs  font-normal pl-3 pr-9 py-2  text-white outline-none appearance-none"
              >
                <option value="duration">Duration</option>

                <option value="calories">Calories</option>

                <option value="rating">Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 -top-2">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Workout list */}
          <div className="mt-6 space-y-4">
            {sortedWorkouts.length > 0 ? (
              sortedWorkouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onRemove={() => handleRemove(workout.id)}
                  onDone={
                    activeTab === "plan"
                      ? () => markDone(workout.id)
                      : undefined
                  }
                  done={"done" in workout ? workout.done : false}
                />
              ))
            ) : (
              <div className="flex min-h-87.5 flex-col items-center justify-center text-center border border-borderS2 rounded-xl">
                <h2 className="text-xl font-black font-Oswald">
                  NOTHING HERE YET
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
                  {activeTab === "plan"
                    ? "Browse the library and add a workout to get today moving."
                    : "Save workouts from the library and they will appear here."}
                </p>

                <Link
                  href="/"
                  className="mt-6 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
                >
                  GO TO WORKOUTS
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPlanPage;
