"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-[#121212] border-b border-[#2a2a2a] text-white">
       <div className="flex items-center gap-3">
            <div className="text-[#b6ff00]">

            <Image src="/logo.png" alt="logo" width={30} height={30}/>
           
            </div>

            <span className="text-xl font-extrabold tracking-tight text-white">
              FITLOG
            </span>
          </div>

      <div className="flex gap-6 items-center">
        <Link
          href="/"
          className={pathname === "/" ? "text-[#ccff00] font-semibold" : "text-gray-400 hover:text-white"}
        >
          Workouts
        </Link>
        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-[#ccff00] font-semibold" : "text-gray-400 hover:text-white"}
        >
          My Plan
        </Link>
      </div>

      <div className="flex gap-3">
        <Link href="/my-plan" className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold">
          Plan: {plan.length}
        </Link>
        <Link href="/my-plan" className="border border-[#ccff00] text-[#ccff00] px-3 py-1 rounded-full text-xs font-bold">
          Saved: {saved.length}
        </Link>
      </div>
    </nav>
  );
}