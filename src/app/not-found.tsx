import Link from "next/link";

export default function NotFound() {
  return (

    
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-7xl font-extrabold text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold text-white mt-4">Page Not Found</h2>
      <p className="text-gray-400 mt-2">The workout or page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 bg-[#2a2a2a] text-white px-6 py-2 rounded hover:bg-[#333] transition">
        Back to Home
      </Link>
    </div>

  );

};