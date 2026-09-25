import { WorkoutsT } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const Library = async () => {
  const response = await fetch(API_URL);

  const workouts: WorkoutsT[] = await response.json();

  return (
    <section>
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white font-Oswald tracking-tighter leading-9">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default Library;
