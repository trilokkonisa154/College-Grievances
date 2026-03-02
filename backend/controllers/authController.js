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