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

  const handleDone = (id: number) => {
    removeFromPlan(id);

    successToast("Workout marked as done");
  };

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
    <div className="min-h-screen bg-[#0d0f12] text-white">
      <main className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-black">MY PLAN</h1>

            <p className="mt-2 text-sm text-gray-400">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Metrics */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
              <p className="text-sm text-gray-400">Exercises</p>

              <p className="mt-2 text-3xl font-bold">{plan.length}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
              <p className="text-sm text-gray-400">Minutes</p>

              <p className="mt-2 text-3xl font-bold">{totalMinutes}</p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-[#15181d] p-5">
              <p className="text-sm text-gray-400">Calories</p>

              <p className="mt-2 text-3xl font-bold">{totalCalories}</p>
            </div>
          </div>

          {/* Tabs + Sort */}
          <div className="mt-10 flex flex-col justify-between gap-5 border-b border-gray-800 sm:flex-row sm:items-end">
            {/* Tabs */}
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("plan")}
                className={`pb-3 text-sm font-bold ${
                  activeTab === "plan"
                    ? "border-b-2 border-lime-400 text-lime-400"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                TODAY&apos;S PLAN
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`pb-3 text-sm font-bold ${
                  activeTab === "saved"
                    ? "border-b-2 border-lime-400 text-lime-400"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                SAVED
              </button>
            </div>

            {/* Sort */}
            <div className="pb-3">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="rounded-lg border border-gray-700 bg-[#15181d] px-3 py-2 text-sm text-white outline-none"
              >
                <option value="duration">Sort by Duration</option>

                <option value="calories">Sort by Calories</option>

                <option value="rating">Sort by Rating</option>
              </select>
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
              <div className="flex min-h-87.5 flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-black">NOTHING HERE YET</h2>

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
