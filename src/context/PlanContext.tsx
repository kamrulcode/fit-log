"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { WorkoutsT } from "@/types/workout";

type PlanContextType = {
  plan: WorkoutsT[];
  saved: WorkoutsT[];

  addToPlan: (workout: WorkoutsT) => boolean;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: WorkoutsT) => boolean;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [plan, setPlan] = useState<WorkoutsT[]>([]);
  const [saved, setSaved] = useState<WorkoutsT[]>([]);

  // Important:
  // We don't save anything until localStorage
  // has finished loading.
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }

    // Loading is finished
    setIsLoaded(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, isLoaded]);

  // Save saved workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, isLoaded]);

  // Add to today's plan
  const addToPlan = (workout: WorkoutsT) => {
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      return false;
    }

    // Maximum 5 workouts
    if (plan.length >= 5) {
      return false;
    }

    setPlan((currentPlan) => [...currentPlan, workout]);

    return true;
  };

  // Remove from today's plan
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) => currentPlan.filter((item) => item.id !== id));
  };

  // Add to saved
  const addToSaved = (workout: WorkoutsT) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      return false;
    }

    setSaved((currentSaved) => [...currentSaved, workout]);

    return true;
  };

  // Remove from saved
  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) => currentSaved.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};
