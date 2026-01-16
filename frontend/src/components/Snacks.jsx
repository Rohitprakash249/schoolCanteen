import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Snacks() {
    const [isLoading, setIsLoading] = useState(true);
    const [snacksData, setSnacksData] = useState([])
    const [studentsData, setStudentsData] = useState([])
    const [studentId,setStudentId]= useState(0)
    const [itemNameToOrder,setItemNameToOrder]=useState("")
    const [priceOfItem,setPriceOfItem]=useState()
    const apiUrl = import.meta.env.VITE_API_URL
    console.log(itemNameToOrder)
    // console.log(apiUrl)
    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const res = await fetch(`${apiUrl}/snacks`, { method: "GET" });
                const data = await res.json();
                const res2 = await fetch(`${apiUrl}/students`, { method: "GET" });
                const data2 = await res2.json();
                setStudentsData(data2.studentsData)
                // console.log(data2.studentsData)
                setSnacksData(data.snacksData)
                setIsLoading(false)
            } catch {
                console.log("Error occured during fetching of data!")
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])
    return <>
        {isLoading === true && <div className="h-[70svh] text-white flex items-center justify-center">
            <svg className="animate-spin text-purple-400" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path d="M18 12h4" /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path d="m4.9 19.1 2.9-2.9" /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg></div>}
        {snacksData.length === 0 && <div className="h-[70svh] text-white flex items-center justify-center">
            <p className="font-semibold text-center tracking-wide text-xl md:text-4xl">Sorry! there are no snacks avaiable in inventory.</p>
        </div>}
        <div className="p-10  transition-all duration-600   flex grid sm:grid-cols-2  sm:grid-rows-2 md:grid-cols-3  md:grid-rows-3  xl:grid-cols-4  xl:grid-rows-4 gap-10">
            {snacksData.map((singleItem) => { return <SingleSnack setPriceOfItem={setPriceOfItem} setItemNameToOrder={setItemNameToOrder} key={singleItem.id} image={singleItem.image} ordersCount={singleItem.ordersCount} itemName={singleItem.name} price={singleItem.price} description={singleItem.description} /> })}
            <ModalForm studentsData={studentsData} priceOfItem={priceOfItem} studentId={studentId} itemNameToOrder={itemNameToOrder} setStudentId={setStudentId}  />
        </div></>;
}

function SingleSnack({ image, itemName, setPriceOfItem,description, price, ordersCount,setItemNameToOrder }) {
    function showModalAndSelectItemName(){
      document.getElementById('my_modal_3').showModal()
      setItemNameToOrder(itemName)
      setPriceOfItem(price)
        
    }
    return <div className="card  bg-base-100 xl:flex-1 cursor-pointers shadow-2xl relative hover:cursor-pointer transition-transform duration-300 hover:-translate-y-4 hover:shadow-[#3E2470]">
        <figure>
            {/* <img
          src={image}
          alt="Shoes" /> */}
        </figure>
        <div className="card-body">
            <div className="flex justify-between items-center"> <h2 className="card-title">{itemName}</h2> <h2 className="font-semibold text-md tracking-wide">Price: ₹{price}</h2></div>




            <div className="card-actions justify-between items-center">
                <p className="font-semibold text-md">Total Orders : {ordersCount}</p>
                <button className="btn btn-primary" onClick={showModalAndSelectItemName}>Order</button>
            </div>
        </div>
    </div>
}

function ModalForm({ studentsData,setStudentId ,studentId,itemNameToOrder,priceOfItem}) {
    const [selectedStudentName, setSelectedStudentName] = useState("");
    const [quantity, setQuantity] = useState(1)
    const [isLoading,setIsLoading]=useState(false);
function selectStudentIdAndName(id,name){
    setSelectedStudentName(name) 
    setStudentId(id)
  
}

async function placeOrder(){
    try{
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            setIsLoading(true)
            const response = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: studentId,
                    itemName: itemNameToOrder,
                    qty:quantity,
                    price:priceOfItem,
                    totalSpent:quantity*priceOfItem
                })
            });
            
            if (!response.ok) {
                throw new Error("Failed to place order");
            } else {
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
                toast.success("Order Placed Successfully.")
                // setStudentsData(data.studentsData);
            }
            // Optionally handle success, like closing modal or refetching students
        } catch (err) {
            console.error("Error while adding student:", err);
            setIsLoading(false)
        } finally{
            setIsLoading(false)
        }
    }catch{

    }
}
    
    return <>

        <dialog id="my_modal_3" className="modal ">
            <div className="modal-box bg-black text-white ">

                <h3 className="font-bold text-lg ">Place Order</h3>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <div className="p-5">
                    <div>
                        <label className="font-semibold tracking-wider" htmlFor="quantity-select">Quantity : </label>
                        <select
                            id="quantity-select"
                            className="ml-2 px-2 py-1 focus:outline-none rounded bg-white text-black"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map(val => (
                                <option key={val} value={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold tracking-wider">Select Student : {selectedStudentName === "" ? "No Student Selected" : selectedStudentName}</p>
                        <div className="bg-white h-[200px] text-white flex flex-grow flex-col overflow-y-scroll overflow-x-hidden mt-2">
                            {studentsData.map((singleItem) => { return <p onClick={()=>selectStudentIdAndName(singleItem.id,singleItem.name)} className="text-black px-4 py-2 hover:bg-gray-100 cursor-pointer">{singleItem.name}</p> })}
                        </div>
                    </div>
                </div>
                {isLoading===true? <button
                    className="px-3 flex justify-center md:px-6 text-xl cursor-pointer py-1 md:py-1  w-full
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-300 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
               >

<svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-icon lucide-loader"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>

                </button> :<button
                    className="px-3  md:px-6 text-xl cursor-pointer py-1 md:py-1  w-full
           bg-gradient-to-r from-purple-500 to-indigo-500 
           text-white font-semibold tracking-wide 
           shadow-lg shadow-purple-500/30 
           transition-all duration-300 
           hover:scale-105 hover:shadow-purple-500/50 
           active:scale-95
           backdrop-blur-md border border-white/20 flex items-center gap-2"
              onClick={placeOrder}  >

                    Place Order
                </button>}
                
                {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            </div>
        </dialog></>
}