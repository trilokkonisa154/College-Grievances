const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const app = express();


// 🔥 CREATE UPLOADS FOLDER FOR RENDER
if(!fs.existsSync("uploads")){
 fs.mkdirSync("uploads");
}


// 🔥 CORS MUST BE FIRST
app.use(cors({
 origin:"https://college-grievance-tracking-portal.netlify.app",
 methods:["GET","POST","PUT","DELETE","OPTIONS"],
 allowedHeaders:["Content-Type","Authorization"]
}));


// 🔥 HANDLE PREFLIGHT OPTIONS (EXPRESS 5 SAFE)
app.use((req,res,next)=>{
 res.header("Access-Control-Allow-Origin","https://college-grievance-tracking-portal.netlify.app");
 res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
 res.header("Access-Control-Allow-Headers","Content-Type,Authorization");

 if(req.method==="OPTIONS"){
  return res.sendStatus(200);
 }

 next();
});


// 🔥 BODY PARSER AFTER CORS
app.use(express.json());


// 🔥 STATIC FILES
app.use("/uploads",express.static("uploads"));


// 🔥 ROUTES AFTER CORS
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/grievance",require("./routes/grievanceRoutes"));


// 🔥 MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
 console.log("MongoDB Connected");

 const { createDefaultAdmin } = require("./controllers/authController");
 await createDefaultAdmin();

})
.catch(err => console.log(err));


// 🔥 RENDER PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
 console.log("Server running on port "+PORT);
});