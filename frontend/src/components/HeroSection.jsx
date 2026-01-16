import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  function navigateToSnacks() {
    navigate("/snacks")
  }

  return (
    <div className=" heroSection bg-black h-[85svh] flex justify-center items-center">
      <div className="flex flex-col gap-10 items-center justify-center">
        <p className="text-5xl  text-white lg:text-8xl pt-10 text-center font-semibold uppercase">
          Welcome to School Canteen
        </p>
        <button
          className="px-3 md:px-6 text-xl cursor-pointer py-2 md:py-2  rounded-full 
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-300 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
          onClick={navigateToSnacks}
        >

          Click Here to view Snacks
        </button>
      </div>

    </div>
  );
}

