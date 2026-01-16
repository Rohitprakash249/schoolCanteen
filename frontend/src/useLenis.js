// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";

// export default function useLenis() {
//   useEffect(() => {
//     const lenis = new Lenis({
//       lerp: 0.1,
//       smooth: false,
//       wheelMultiplier: 50,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       console.log("working");
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);
// }
