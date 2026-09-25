"use client";

import { useState } from "react";
import { Check, Bookmark } from "lucide-react";

import { WorkoutsT } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";

type WorkoutActionsProps = {
  workout: WorkoutsT;
};

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const [message, setMessage] = useState("");

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      setMessage("Added to today's plan");
    } else if (plan.some((item) => item.id === workout.id)) {
      setMessage("Already added to today's plan");
    } else {
      setMessage("Your plan can only have 5 workouts");
    }

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleSave = () => {
    const added = addToSaved(workout);

    if (added) {
      setMessage("Saved for later");
    } else if (saved.some((item) => item.id === workout.id)) {
      setMessage("Already saved");
    }

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-3">
        {/* Add to plan */}
        <button
          onClick={handleAddToPlan}
          className="flex items-center gap-2 rounded-lg bg-lime-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-300"
        >
          <Check className="h-4 w-4" />
          ADD TO TODAY&apos;S PLAN
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-bold text-white transition hover:border-gray-500"
        >
          <Bookmark className="h-4 w-4" />
          SAVE FOR LATER
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div className="mt-4 inline-block rounded-lg border border-gray-700 bg-[#15181d] px-4 py-3 text-sm text-white shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
};

export default WorkoutActions;
