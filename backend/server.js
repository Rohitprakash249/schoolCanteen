const express = require("express");
const bodyParser = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions))
app.use(bodyParser.json());


app.get("/", (req,res)=>{
    res.send("server is running now.Now you can send Api requests.")
})

const snacksData = [
  {
      id: 1,
      name: "Kurkure",
      description: "Spicy and crunchy corn puffs, a favorite Indian snack for all ages.",
      image: "https://www.jiomart.com/images/product/original/490665557/kurkure-masala-munch-160-g-product-images-o490665557-p590018059-0-202203140110.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 2,
      name: "Lays",
      description: "Classic potato chips available in multiple delicious flavors like Magic Masala and Classic Salted.",
      image: "https://www.layindia.com/sites/lay-india.com/files/2022-04/lays%20magic%20masala.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 3,
      name: "Parle-G",
      description: "The iconic glucose biscuit of India, enjoyed with chai for generations.",
      image: "https://www.bigbasket.com/media/uploads/p/l/1203477_2-parle-g-original-glucose-biscuit.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 4,
      name: "Britannia Marie Gold",
      description: "Light, crisp, and perfect for dunking, these biscuits are a tea-time staple.",
      image: "https://www.bigbasket.com/media/uploads/p/l/267324_2-britannia-marie-gold-biscuits.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 5,
      name: "Haldiram's Bhujia Sev",
      description: "Spicy and crunchy gram flour noodles, perfect as a tea-time snack.",
      image: "https://www.grofers.com/images/cms/new_content/20200902150514_haldrams_bhujia.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 6,
      name: "Bingo! Mad Angles",
      description: "Tangy triangle chips with a delicious masala flavor.",
      image: "https://www.itcstore.in/media/catalog/product/cache/f7421fd5ad110997d7eba1ca44eccd02/b/i/bingo-mad-angles-achari-masti-72-g.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 7,
      name: "Balaji Wafers",
      description: "Famous Gujarati chips, crunchy and bursting with masala.",
      image: "https://images.jdmagicbox.com/quickquotes/images_main/balaji-wafers-masala-wafers-200gm-225817408-ojpzy0py.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 8,
      name: "Hide & Seek",
      description: "Delicious chocolate chip cookies, a treat for all ages.",
      image: "https://www.bigbasket.com/media/uploads/p/l/40066425_7-parle-hide-seek-choco-chip-cookies.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 9,
      name: "Unibic Cashew Badam Cookies",
      description: "Nutty, crunchy cookies loaded with real cashew and almond bits.",
      image: "https://www.bigbasket.com/media/uploads/p/l/40089716_8-unibic-cookie-cashew-badam.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 10,
      name: "Top Ramen Curry Noodles",
      description: "Instant noodles with classic Indian curry flavor.",
      image: "https://m.media-amazon.com/images/I/71XrQPQbqgL.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 11,
      name: "Bikaji Bikaneri Bhujia",
      description: "Legendary spicy snack made of roasted chickpea flour.",
      image: "https://cdn.shopify.com/s/files/1/0277/9996/9345/products/BIKAJIBIKANERIBHUJIA200G.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 12,
      name: "Cadbury Dairy Milk",
      description: "India’s favorite creamy milk chocolate bar.",
      image: "https://5.imimg.com/data5/PS/DO/MY-44288512/cadbury-dairy-milk-chocolate-500x500.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 13,
      name: "Monaco",
      description: "Crispy, salty wafers, loved as a standalone snack or with toppings.",
      image: "https://www.bigbasket.com/media/uploads/p/l/40066492_2-parle-monaco-salted-biscuits.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 14,
      name: "Sunfeast Dark Fantasy Choco Fills",
      description: "Soft cookies filled with chocolate, a delicious indulgence.",
      image: "https://www.bigbasket.com/media/uploads/p/l/40122685_11-sunfeast-dark-fantasy-choco-fills.jpg",
      ordersCount: 2,
      price: 20

  },
  {
      id: 15,
      name: "Magic Pop",
      description: "Popping candy that crackles and fizzes in your mouth – childhood nostalgia!",
      image: "https://www.indianchaishop.co.uk/wp-content/uploads/2019/05/magic-pop-orange.jpg",
      ordersCount: 2,
      price: 20
  },
  {
      id: 16,
      name: "Cadbury Dairy Milk",
      description: "India’s favorite creamy milk chocolate bar.",
      image: "https://5.imimg.com/data5/PS/DO/MY-44288512/cadbury-dairy-milk-chocolate-500x500.jpg",
      ordersCount: 2,
      price: 20
  }
]
let studentsData = [
  {
      id: 1,
      name: "Ravi Sharma",
      referralCode: "RaviSharma1",
      orders: []
  },
  {
      id: 2,
      name: "Priya Patel",
      referralCode: "PriyaPatel2",
      orders: []
  },
  {
      id: 3,
      name: "Aryan Gupta",
      referralCode: "AryanGupta3",
      orders: []
  },
  {
      id: 4,
      name: "Sneha Chawla",
      referralCode: "SnehaChawla4",
      orders: []
  },
  {
      id: 5,
      name: "Vikas Verma",
      referralCode: "VikasVerma5",
      orders: []
  },
  {
      id: 6,
      name: "Meera Nair",
      referralCode: "MeeraNair6",
      orders: []
  },
  {
      id: 7,
      name: "Rahul Singh",
      referralCode: "RahulSingh7",
      orders: []
  },
  {
      id: 8,
      name: "Pooja Yadav",
      referralCode: "PoojaYadav8",
      orders: []
  },
  {
      id: 9,
      name: "Kabir Mehta",
      referralCode: "KabirMehta9",
      orders: []
  },
  {
      id: 10,
      name: "Simran Kaur",
      referralCode: "SimranKaur10",
      orders: []
  },
  {
      id: 11,
      name: "Aman Saini",
      referralCode: "AmanSaini11",
      orders: []
  },
  {
      id: 12,
      name: "Isha Malhotra",
      referralCode: "IshaMalhotra12",
      orders: []
  },
  {
      id: 13,
      name: "Nikhil Aggarwal",
      referralCode: "NikhilAggarwal13",
      orders: []
  },
  {
      id: 14,
      name: "Tanya Roy",
      referralCode: "TanyaRoy14",
      orders: []
  },
  {
      id: 15,
      name: "Saurabh Dubey",
      referralCode: "SaurabhDubey15",
      orders: []
  },
  {
      id: 16,
      name: "Akansha Jain",
      referralCode: "AkanshaJain16",
      orders: []
  }
]

app.get("/snacks",(req,res)=> {
 
 return res.json({
  snacksData:snacksData
 })
})

app.get("/students",(req,res)=> {
 
  return res.json({
   studentsData:studentsData
  })
 })
app.get("/students/:id",(req,res)=>{
  const  params  = req.params;
  console.log(params.id)
  const findData = studentsData.filter((singleItem)=> singleItem.id==params.id)
  console.log(findData)
  
  if(findData.length===0){
    return res.json({
      message:"No User Found with this id"
    })
  } else {
    return res.json({
      studentDetail:findData[0]
    })
  }
  
})

app.post("/students",(req,res)=>{
console.log(req.body)
const existingStudent = studentsData.find(student => student.id == req.body.id);
if(existingStudent){
  return res.json({message:"User Already Exists with provided id"})
} else {
  const finalData = { id: req.body.id,
  name: req.body.studentName,
  referralCode: req.body.referralCode,
  orders: []}
  studentsData.push(finalData)
  return res.json({
    studentsData:studentsData
  })
}
})

app.post("/orders",(req,res)=> {
  try{
    const data = req.body;
    studentsData[req.body.id-1].orders.push(req.body);
    console.log(studentsData)
    return res.json({
      data:studentsData,
      message:"Order placed Successfully"
    })
  }catch {
    return res.json({message:"Something went Wrong."})
  }

})

const port =  8080;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
