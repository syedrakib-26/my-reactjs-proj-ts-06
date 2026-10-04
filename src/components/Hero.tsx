import Image from 'next/image'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 px-6 max-w-7xl mx-auto">
      <div>
        <span className="text-xs uppercase bg-[#2a2a2a] text-[#ccff00] px-3 py-1 rounded-full font-bold">
          Workout Library
        </span>
        <h1 className="text-4xl sm:text-6xl font-black mt-4 tracking-tight leading-none text-white">
          TRAIN WITH INTENT. <br /> LOG EVERY SET.
        </h1>
        <p className="text-gray-300 mt-4 max-w-lg">
          Track workouts, build custom routines, and monitor your fitness journey with precision.
        </p>
        <a
          href="#library"
          className="inline-block mt-8 bg-[#ccff00] text-black font-bold px-8 py-3 rounded hover:bg-opacity-90 transition"
        >
          BROWSE WORKOUTS
        </a>
      </div>
      <div className="w-full h-72 sm:h-96 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#0b0b0b]">
                  <div className=" md: w-[45%]">
          
            <Image src="/banner.png" alt="Workout exercise" width={600} height={600} className='h-auto object-contain'/>

          </div>
        {/* <span className="text-gray-500 font-medium">Hero Image / Graphic</span> */}
      </div>
    </section>
  );
}