require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");

const app = express();

/* uploads folder */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* allowed origins */
const allowedOrigins = [
  "http://localhost:4200",
  "https://YOUR-VERCEL-APP.vercel.app"
];

/* cors */
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null,true);

    if(allowedOrigins.includes(origin)){
      return callback(null,true);
    }

    return callback(new Error("CORS blocked"));
  },
  credentials:true
}));

/* body parser */
app.use(express.json());

/* static uploads */
app.use("/uploads", express.static("uploads"));

/* routes */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/grievance", require("./routes/grievanceRoutes"));

/* db */
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("MongoDB Connected");
  console.log("DB =", mongoose.connection.name);
})
.catch(err=>console.log(err));

/* start */
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});