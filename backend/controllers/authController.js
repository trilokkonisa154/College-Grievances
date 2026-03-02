const User=require("../models/User");
const bcrypt=require("bcryptjs");
const generateToken=require("../utils/generateToken");

exports.register=async(req,res)=>{
 const {name,email,password,role,idNumber}=req.body;

 const salt=await bcrypt.genSalt(10);
 const hashed=await bcrypt.hash(password,salt);

 await User.create({
  name,email,password:hashed,role,idNumber
 });

 res.json({msg:"Registered"});
};

exports.login=async(req,res)=>{

 const {email,password,role}=req.body;

 const user=await User.findOne({
  email:email.toLowerCase(),
  role:role
 });

 if(!user)
  return res.status(401).json({msg:"Account not found"});

 const match=await bcrypt.compare(password,user.password);

 if(!match)
  return res.status(401).json({msg:"Incorrect Password"});

 res.json({
  token:generateToken(user._id,user.role),
  user
 });
};

const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createDefaultAdmin = async () => {
 try {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
   const hashed = await bcrypt.hash("admin123", 10);

   await User.create({
    name: "System Admin",
    email: "admin@gmail.com",
    idNumber: "ADMIN001",
    password: hashed,
    role: "admin"
   });

   console.log("Default admin created");
  }

 } catch (err) {
  console.log("Admin creation error:", err);
 }
};