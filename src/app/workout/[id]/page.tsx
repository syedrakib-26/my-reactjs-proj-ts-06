"use client";

import { use, useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  const { id } = use(params);
  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading workout details...</div>;
  }

  if (!workout) {
    return <div className="text-center py-20 text-red-400">Workout not found.</div>;
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="h-72 sm:h-96 w-full rounded-xl overflow-hidden mb-8 border border-[#2a2a2a]">
        
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {workout.muscleGroups?.map((group, index) => (
          <span key={index} className="text-xs bg-[#2a2a2a] text-[#ccff00] px-3 py-1 rounded-full">
            {group}
          </span>
        ))}
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-white">{workout.name}</h1>
      <p className="text-gray-400 mt-4 leading-relaxed">{workout.description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-4 bg-[#161616] border border-[#2a2a2a] rounded-lg">
        <div>
          <span className="text-xs text-gray-500">Duration</span>
          <p className="text-lg font-bold text-white">{workout.duration} mins</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Calories</span>
          <p className="text-lg font-bold text-white">{workout.caloriesBurned} kcal</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Sets & Reps</span>
          <p className="text-lg font-bold text-white">{workout.sets} × {workout.reps}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Difficulty</span>
          <p className="text-lg font-bold text-white">{workout.difficulty}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          {workout.instructions?.map((step, index) => (
            <li key={index} className="leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => addToPlan(workout)}
          disabled={isPlanFull || isAlreadyInPlan}
          className="flex-1 bg-[#ccff00] text-black font-bold py-3 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-opacity-90 transition"
        >
          {isAlreadyInPlan ? "Already in Plan" : isPlanFull ? "Plan Full (Max 5)" : "Add to Today's Plan"}
        </button>
        <button
          onClick={() => addToSaved(workout)}
          className="flex-1 border border-[#2a2a2a] bg-[#161616] text-white font-bold py-3 rounded hover:bg-[#202020] transition"
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}