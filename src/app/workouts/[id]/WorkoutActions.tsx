"use client";

import { Check, Bookmark } from "lucide-react";

import { WorkoutsT } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import { successToast } from "@/components/toast";

type WorkoutActionsProps = {
  workout: WorkoutsT;
};

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { plan, saved, addToPlan, addToSaved } = usePlan();

  const handleAddToPlan = () => {
    const added = addToPlan(workout);

    if (added) {
      successToast("Added to today's plan");
    } else if (plan.some((item) => item.id === workout.id)) {
      successToast("Already added to today's plan");
    } else {
      successToast("Your plan can only have 5 workouts");
    }
  };

  const handleSave = () => {
    const added = addToSaved(workout);

    if (added) {
      successToast("Saved for later");
    } else if (saved.some((item) => item.id === workout.id)) {
      successToast("Already saved");
    }
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
    </div>
  );
};

export default WorkoutActions;
