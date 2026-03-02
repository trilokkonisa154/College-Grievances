const mongoose=require('mongoose');

const grievanceSchema=mongoose.Schema({

 image:String,   
 title:String,
 description:String,
 category:String,

 status:{
  type:String,
  default:"Pending"
 },

 userMongoId:String,
 userId:String,
 userName:String,

 updates:[
  {
   date:String,
   note:String,
   updatedBy:String
  }
 ]

});

module.exports=mongoose.model("Grievance",grievanceSchema);
