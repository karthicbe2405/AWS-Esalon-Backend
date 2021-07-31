const mongoose=require('mongoose');
const shop=new mongoose.Schema({
    shopName:{
        type:String,
        required:true
    },
    shopAddress:{
        type:String,
        required:true
    },
    shopImage:{
        type:String,
        required:true
    },
    shopServices:[{
        serviceName:{
            type:String,
            required:true
        },
        servicePrice:{
            type:String,
            required:true
        }
    }],
    
});
module.exports=Shop=mongoose.model("shop",shop);