import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#121212] py-6 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-2">

            <div className="flex h-5 w-5 items-center justify-center text-[#b6ff00]">

                <Image src="/logo.png" alt="logo" width={30} height={30}/>
                
            </div>

            <span className="text-xs font-bold tracking-wide"> FITLOG </span>

          </div>
        <p className="mt-2 sm:mt-0">© 2026 FitLog-Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}