const Grievance=require("../models/Grievance");

exports.submit=async(req,res)=>{

 const g=await Grievance.create({

  title:req.body.title,
  description:req.body.description,
  category:req.body.category,

  userMongoId:req.body.userMongoId,
  userId:req.body.userId,
  userName:req.body.userName,

  image:req.file ? req.file.filename : null,

  status:"Pending",

  updates:[
   {
    date:new Date().toISOString().split("T")[0],
    note:"Grievance Submitted",
    updatedBy:req.body.userName
   }
  ]

 });

 res.json(g);
};

exports.getAll=async(req,res)=>{
 const data=await Grievance.find();
 res.json(data);
};

exports.updateStatus=async(req,res)=>{

 const {id,status}=req.body;

 const g=await Grievance.findById(id);

 if(!g)
  return res.status(404).json({msg:"Not found"});

 // 🔥 STOP DUPLICATE UPDATE
 if(g.status===status)
  return res.json(g);

 g.status=status;

 g.updates.push({
  note:"Status changed to "+status,
  date:new Date().toLocaleDateString()
 });

 await g.save();

 res.json(g);

};