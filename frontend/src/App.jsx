
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Snacks from "./components/Snacks";
import Students from "./components/Students";
import Home from "./components/Home";
import Offers from "./components/Offers";
import "./App.css";
import StudentDetails from "./components/StudentDetails";
import { Toaster } from "react-hot-toast";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL
  console.log(apiUrl)
  return (
    <>
   
      <Offers />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetails />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
