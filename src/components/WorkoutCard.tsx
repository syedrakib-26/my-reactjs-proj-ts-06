import Link from "next/link";
import { Workout } from "@/types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#161616] border border-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50 block"
    >
      <div className="h-48 bg-[#202020] overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex gap-2 flex-wrap mb-2">
          {workout.muscleGroups?.map((group, index) => (
            <span key={index} className="text-[10px] bg-[#2a2a2a] text-[#ccff00] px-2 py-0.5 rounded">
              {group}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{workout.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{workout.equipment}</p>
        <div className="flex justify-between items-center text-xs text-gray-300 border-t border-[#2a2a2a] pt-3">
          <span>{workout.duration} mins</span>
          <span>{workout.caloriesBurned} kcal</span>
          <span className="text-[#ccff00]">★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}