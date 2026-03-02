const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");

const app=express();
app.use(cors({
 origin:"https://college-grievance-tracking-portal.netlify.app",
 methods:["GET","POST","PUT","DELETE","OPTIONS"],
 allowedHeaders:["Content-Type","Authorization"]
}));

app.options("*",cors());
app.use(express.json());

connectDB();

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/grievance",require("./routes/grievanceRoutes"));
app.use("/uploads",express.static("uploads"));
app.use("/uploads",require("express").static("uploads"));

const User=require("./models/User");
const bcrypt=require("bcryptjs");

async function createDefaultAdmin(){

 const admin=await User.findOne({email:"admin@college.edu"});

 if(!admin){

  const salt=await bcrypt.genSalt(10);
  const hashed=await bcrypt.hash("admin123",salt);

  await User.create({
   name:"System Admin",
   email:"admin@college.edu",
   password:hashed,
   role:"admin",
   idNumber:"ADM-GLOBAL"
  });

  console.log("Default Admin Created");
 }
 else{
  console.log("Admin already exists");
 }

}

createDefaultAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
 console.log("Server running");
});