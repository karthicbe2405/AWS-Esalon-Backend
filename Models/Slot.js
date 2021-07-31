const mongoose =require('mongoose')
const slot=new mongoose.Schema({
    shopId:{
        type:String,
        required:true
    },
    slots:[
        {
            slotId:{
                type:String,
                required:true
            },
            status:{
                type:Boolean,
                required:true
            }
        }
    ]
});
module.exports=Slot=mongoose.model("slot",slot);