"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { WorkoutsT } from "@/types/workout";
import { successToast } from "@/components/toast";

type PlanContextType = {
  plan: WorkoutsT[];
  saved: WorkoutsT[];

  addToPlan: (workout: WorkoutsT) => boolean;
  removeFromPlan: (id: number) => void;
  toggleSaved: (id: number) => void;
  markDone: (id: number) => void;
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
    const loadData = () => {
      try {
        const savedPlan = localStorage.getItem("fitlog-plan");
        const savedWorkouts = localStorage.getItem("fitlog-saved");

        setPlan(savedPlan ? JSON.parse(savedPlan) : null);
        setSaved(savedWorkouts ? JSON.parse(savedWorkouts) : []);
      } catch (error) {
        console.error("Failed to load Fitlog data:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
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

  const toggleSaved = useCallback(
    (id: number) => {
      setSaved((currentSaved) => {
        const alreadySaved = currentSaved.some((item) => item.id === id);

        if (alreadySaved) {
          successToast("Removed from saved");

          return currentSaved.filter((item) => item.id !== id);
        }

        successToast("Saved for later");

        // Find the workout and add it
        const workoutToSave = plan.find((item) => item.id === id);

        if (!workoutToSave) {
          return currentSaved;
        }

        return [...currentSaved, workoutToSave];
      });
    },
    [plan],
  );

  const markDone = useCallback((id: number) => {
    setPlan((current) =>
      current.map((item) => (item.id === id ? { ...item, done: true } : item)),
    );
    successToast("Workout marked as done");
  }, []);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleSaved,
        markDone,
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
