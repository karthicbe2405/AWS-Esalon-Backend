const mongoose = require('mongoose');
const slotAvailability = new mongoose.Schema({
    shopId:{
        type:String,
        required:true
    },
    date:{
        type: String,
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
module.exports = SlotAvailability=mongoose.model('slotAvailability',slotAvailability);