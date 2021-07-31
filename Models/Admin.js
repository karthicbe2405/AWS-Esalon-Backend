const mongoose =require('mongoose');
const admin =new mongoose.Schema({
    AdminId:{
        type:String,
        required:true
    },
    AdminPassword:{
        type:String,
        required:true
    }
});
module.exports=Admin=mongoose.model("admin",admin);