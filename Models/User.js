const mongoose = require('mongoose');
const user = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail: {
        type : String,
        required : true
        
    },
    userPassword: {
        type : String, 
        required:true

    },
    userMobileNum: {
        type : String, 
        required:true

    }
});

module.exports =User=mongoose.model('user', user);
