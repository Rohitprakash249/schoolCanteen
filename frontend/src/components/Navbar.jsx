import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
function navigateToHomePage(){
  navigate("/")
}
  return (
    <header className="px-5 header bg-black items-center sticky md:px-10 shadow-2xl py-4 xl:py-3 flex justify-between">
      <div className="flex items-center gap-5">

        <p className="uppercase tracking-widest text-2xl md:text-3xl">
          <span className="font-bold text-[#834fde] " onClick={navigateToHomePage}>School</span>{" "}
          <span className="text-white  font-bold " onClick={navigateToHomePage}>Canteen</span>
        </p>
      </div>

      <nav className="flex gap-10 md:text-xl text-white hidden duration-500 lg:flex">
        <a
          href="/snacks"
          className="relative nav-item group w-auto hover:text-[#834fde] duration-700"
          style={{ animationDelay: "0.5s" }}
        >
          Snacks
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </a>


        <a
          href="/students"
          className="nav-item relative group hover:text-[#834fde]"
          style={{ animationDelay: "0.7s" }}
        >
          Students
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-5px] w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </a>


      </nav>

      <button
        onClick={() => navigate("/snacks")}
        className="px-3 text-sm md:text-xl uppercase md:px-6  cursor-pointer py-1 md:py-1 rounded-lg  sm:rounded-full 
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-600 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
      >

        Place Order
      </button>
    </header>
  );
}
