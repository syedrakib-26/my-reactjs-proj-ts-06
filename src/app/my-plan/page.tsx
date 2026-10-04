"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { PlanWorkout } from "@/types";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");
  const { plan, saved, metrics, removeFromPlan, removeFromSaved, markAsDone } = usePlan();

  const currentList = activeTab === "plan" ? plan : saved.map((item) => ({ ...item, isDone: false })) as PlanWorkout[];

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* 1. Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#161616] border border-[#2a2a2a] p-6 rounded-lg">
          <span className="text-xs text-gray-400">Total Exercises</span>
          <p className="text-3xl font-black text-[#ccff00] mt-1">{metrics.exercises}</p>
        </div>
        <div className="bg-[#161616] border border-[#2a2a2a] p-6 rounded-lg">
          <span className="text-xs text-gray-400">Total Minutes</span>
          <p className="text-3xl font-black text-white mt-1">{metrics.minutes} min</p>
        </div>
        <div className="bg-[#161616] border border-[#2a2a2a] p-6 rounded-lg">
          <span className="text-xs text-gray-400">Calories Burned</span>
          <p className="text-3xl font-black text-white mt-1">{metrics.calories} kcal</p>
        </div>
      </div>

    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-[#2a2a2a] pb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-2 font-bold text-sm tracking-wide ${
              activeTab === "plan" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-gray-400"
            }`} >

            Todays Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-2 font-bold text-sm tracking-wide ${
              activeTab === "saved" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-gray-400"
            }`} >
            Saved for Later ({saved.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#161616] border border-[#2a2a2a] text-white text-xs px-3 py-1.5 rounded focus:outline-none"
          >
            <option value="duration">Duration (Low-High)</option>
            <option value="calories">Calories (High-Low)</option>
            <option value="rating">Rating (High-Low)</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="text-center py-20 bg-[#161616] border border-dashed border-[#2a2a2a] rounded-lg">
          <h3 className="text-lg font-bold text-white mb-2">NOTHING HERE YET</h3>
          <p className="text-sm text-gray-400 mb-6">Browse the library and start building your routine.</p>
          <Link href="/" className="bg-[#ccff00] text-black font-bold px-6 py-2 rounded text-sm hover:bg-opacity-90">
            Browse Library
          </Link>
        </div>
      ) : (

        <div className="space-y-4">
          {sortedList.map((item) => {
            const isPlanItem = "isDone" in item;
            return (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#161616] border border-[#2a2a2a] rounded-lg gap-4 ${
                  isPlanItem && item.isDone ? "opacity-50" : ""
                }`}
              >
                <div>
                  <h4 className="font-bold text-white flex items-center gap-2">
                    {item.name}
                    {isPlanItem && item.isDone && (
                      <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded border border-green-700">
                        Done
                      </span>
                    ) } </h4>


                  <p className="text-xs text-gray-400 mt-1">
                    {item.duration} mins • {item.caloriesBurned} kcal • {item.equipment}
                  </p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Link
                    href={`/workout/${item.id}`}
                    className="text-xs bg-[#2a2a2a] text-white px-3 py-2 rounded text-center flex-1 sm:flex-none"
                  >
                    View Details
                  </Link>
                  {activeTab === "plan" && !item.isDone && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="text-xs bg-green-600/20 border border-green-500 text-green-400 px-3 py-2 rounded flex-1 sm:flex-none"
                    >
                      ✓ Done
                    </button>
                  )}
                  <button
                    onClick={() =>
                      activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                    }
                    className="text-xs bg-red-600/20 border border-red-500 text-red-400 px-3 py-2 rounded flex-1 sm:flex-none"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}