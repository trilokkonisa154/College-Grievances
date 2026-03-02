const router=require("express").Router();
const {register,login}=require("../controllers/authController");

router.post("/register",register);
router.post("/login",login);
router.get("/resetAdmin",async(req,res)=>{

 const bcrypt=require("bcryptjs");
 const User=require("../models/User");

 const salt=await bcrypt.genSalt(10);
 const hashed=await bcrypt.hash("admin123",salt);

 await User.updateOne(
  {email:"admin@college.edu"},
  {password:hashed}
 );

 res.send("Admin Password Reset");

});

module.exports=router;