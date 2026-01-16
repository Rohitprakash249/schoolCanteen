import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Students() {
    const [isLoading, setIsLoading] = useState(false);
    const [studentsData, setStudentsData] = useState([])
    
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const res = await fetch(`${apiUrl}/students`, { method: "GET" });
                const data = await res.json();
                setStudentsData(data.studentsData)

                setIsLoading(false)
            } catch {
                console.log("Error occured during fetching of data!")
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    return <><button
        className="px-3 mx-10 mt-5 uppercase md:px-6 text-xl cursor-pointer py-1 md:py-1  rounded-full 
   bg-gradient-to-r from-purple-500 to-indigo-500 
   text-white font-semibold tracking-wide 
   shadow-lg shadow-purple-500/30 
   transition-all duration-300 
   hover:scale-105 hover:shadow-purple-500/50 
   active:scale-95
   backdrop-blur-md border border-white/20 flex items-center gap-2"
        onClick={() => document.getElementById('my_modal_3').showModal()
        }   >

        Add a Student
    </button>
        {isLoading === true && <div className="h-[70svh] text-white flex items-center justify-center">
            <svg className="animate-spin text-purple-400" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg></div>}
        {studentsData.length === 0 && <div className="h-[70svh] text-white flex items-center justify-center">
            <p className="font-semibold text-center tracking-wide text-xl md:text-4xl">Sorry! there are no students added in the system.</p>
        </div>}

        <div className="p-10  flex grid md:grid-cols-4 md:grid-rows-4 gap-10">
            {studentsData.map((singleItem) => { return <SingleStudent key={singleItem.id} orders={singleItem.orders} itemName={singleItem.name} id={singleItem.id} referralCode={singleItem.referralCode} /> })}

        </div>
        <ModalForm totalStudentsDataLength={studentsData.length} setStudentsData={setStudentsData} /></>;
}
function ModalForm({ totalStudentsDataLength, setStudentsData }) {
    const [studentId, setStudentId] = useState()
    const [isLoading,setIsLoading]= useState(false)
    const [studentName, setStudentName] = useState("")
    const id = totalStudentsDataLength + 1;
    const referralCode = studentName + (totalStudentsDataLength + 1)
    async function addStudent() {
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            setIsLoading(true)
            const response = await fetch(`${apiUrl}/students`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    studentName: studentName,
                    referralCode: referralCode
                })
            });
            if (!response.ok) {
                throw new Error("Failed to add student");
                setIsLoading(false)
            } else {
                const data = await response.json()
                // console.log(data)
                setStudentsData(data.studentsData);
                setIsLoading(false)
                toast.success("student added successfully!")
            }
            // Optionally handle success, like closing modal or refetching students
        } catch (err) {
            console.error("Error while adding student:", err);
        } finally{
            setIsLoading(false)
        }
    }


    return <>

        <dialog id="my_modal_3" className="modal ">
            <div className="modal-box bg-black text-white ">

                <h3 className="font-bold text-lg ">Add Student</h3>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="my-2">
                    <div className="flex "><p>Student Name : </p><input onChange={(e) => setStudentName(e.target.value)} className="focus:outline-none px-2 " value={studentName} type="text" placeholder="Enter Name"></input> </div>
                    <div className="flex gap-2"><span>Referral Code : {referralCode}</span></div>

                </div>
                {isLoading===true?<button
                    
                    className="px-3 flex justify-center  md:px-6 text-xl cursor-pointer py-1 md:py-1  w-full
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-300 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
                >

<svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>

                </button> : <button
                    onClick={addStudent}
                    className="px-3  md:px-6 text-xl cursor-pointer py-1 md:py-1  w-full
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-300 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
                >

                    Add Student
                </button>}
                
                {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            </div>
        </dialog></>
}
function SingleStudent({ itemName, referralCode, id ,orders}) {
    const navigate = useNavigate();
    const totalAmount = orders.reduce((acc, curr) => acc + (curr.totalSpent || 0), 0);
   console.log(totalAmount)
    return <div className="card  bg-base-100 xl:flex-1 cursor-pointers shadow-2xl relative hover:cursor-pointer transition-transform duration-300 hover:-translate-y-4 hover:shadow-[#3E2470]">
        <figure>
           
        </figure>
        <div className="card-body">
            <div className="flex justify-between items-center"><h2 className="card-title">{itemName}</h2><h2 className=" text-md"><span className="font-semibold tracking-wide">Ref. Code :</span> {referralCode}</h2></div>
            <h2 className=""><span className="text-md font-semibold tracking-wide">Total Spent :</span> ₹{orders.length===0 ? 0: `${totalAmount}`}</h2>

            <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => navigate(`/students/${id}`)} >View Details </button>
            </div>
        </div>
    </div>
}

