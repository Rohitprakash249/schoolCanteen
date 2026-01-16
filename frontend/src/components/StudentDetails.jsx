
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function StudentDetails() {
    const params = useParams();
    const [orders, setOrders] = useState([])
    const [studentName, setStudentName] = useState("")
    const [totalAmountSpent, setTotalAmountSpent] = useState()
    const [isLoading,setIsLoading]=useState(false);
    const apiUrl = import.meta.env.VITE_API_URL
   
    const totalAmount = orders.reduce((acc, curr) => acc + (curr.totalSpent || 0), 0);
   
    useEffect(() => {
        async function fetchStudentData() {
            try{ 
                setIsLoading(true)
                const res = await fetch(`${apiUrl}/students/${params.id}`, { method: "GET" });
            const data = await res.json();
            setStudentName(data.studentDetail.name)
            setOrders(data.studentDetail.orders)
            setIsLoading(false)
        }catch{
            setIsLoading(false)
        }finally{
            setIsLoading(false)
        }
           
        }
        fetchStudentData()
    }, [])
    return <>
    {isLoading===true? <div className="w-full h-svh flex justify-center py-20 text-purple-500"><svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg></div> : <div className="w-full flex flex-col items-center gap-5 justify-center py-5 px-5">
        <div className="max-w-[900px] w-full rounded-lg bg-[#7743de] py-5 px-5 font-semibold tracking-wide">
            <h1 className="text-white">{studentName}'s Details</h1>
        </div>
        <div className="max-w-[900px] w-full rounded-lg px-5 py-5 bg-white">
            <div className="flex justify-between"><p className=" font-semibold tracking-wider mb-4">Orders</p> <p className="font-semibold tracking-wider mb-4 text-green-500">Total Spent :{orders.length === 0 ? `₹0` : `₹${totalAmount}`}</p></div>
            <div className="flex flex-col gap-4">
                {orders.map((singleElement) => <SingleOrder dataOfItem={singleElement} />)}
               
            </div>
            {orders.length === 0 && <NoOrderExist />}
        </div>
    </div> }
   </>
}

function NoOrderExist() {
    return <div className="w-full font-semibold flex items-center justify-center text-white text-2xl py-5 h-[150px] bg-[#b7e22d] px-5 rounded-2xl text-black">

        Sorry, No order Exists for this user!
    </div>
}

function SingleOrder({dataOfItem}) {
  
    return <div className="w-full py-5 bg-[#b7e22d] px-5 rounded-2xl text-black">
        <h1 className="font-semibold">Snack Name : {dataOfItem.itemName}</h1>
        <h1 className="font-semibold">Quantity: {dataOfItem.qty}</h1>
        <h1 className="font-semibold">Total Payable Amount: ₹ {dataOfItem.totalSpent}</h1>

    </div>
}