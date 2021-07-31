const express = require('express');
const mongoose=require('mongoose');
const User=require('../Models/User');
//const user=require('../models/User');
const bcrypt=require('bcrypt');
const route=express.Router();
const Booking = require('../Models/Bookings');
const nodemailer=require('nodemailer');

route.post('/signup',async(req,res)=>{
    const{userName,userEmail,userPassword,userMobileNum}=req.body;
    let user={};
    user.userName=userName;
    user.userEmail=userEmail;
    user.userPassword= userPassword;
    user.userMobileNum= userMobileNum;
    let userModel =new User(user);
    await userModel.save();
    return res.status(200).json({"message":"Signup successful"});
});

route.post('/login', async (req, res) => {
    console.log("Login Attempt");
    try {
        const user = await User.findOne({
            userEmail: req.body.userEmail
        });
        if (!user) {
            return res.status(404).send("Invalid Email!");
        }
        if (req.body.userPassword != user.userPassword) {
            return res.status(404).send("Incorrect Password!");
        }
        return res.status(200).json({"message":"Login successful"});
    }catch (err) {
        console.log("ERROR:: ", err);
        return res.status(404).send("Error");

    }
});
route.get('/getShops',(req,res)=>{
    
    Shop.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
})
route.post('/getShop',(req,res)=>{
    Shop.find({
        _id:req.body.shopId,
    },(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Printing the shop : " +result);
            res.send(result);
        }
    })
})
route.post('/getSlots',(req,res)=>{
    console.log(req.body.shopId);
    SlotAvailability.find({
        shopId:req.body.shopId,
    },(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
})

route.post('/bookSlot',async(req,res)=>{
    const booking={};
    booking.shopId=req.body.shopId;
    booking.userEmail=req.body.userEmail;
    booking.shopName=req.body.shopName;
    booking.date=req.body.date;
    booking.slotId=req.body.slotId;
    booking.time=req.body.time;
    booking.totalCost=req.body.totalCost;
    booking.service=req.body.service;
    let bookModel=new Booking(booking);

    
    try{
        var book=await SlotAvailability.findOne({shopId:booking.shopId,date:booking.date});
        
        // book.shopName="amazon";
        // book.save();
        if(book){
            book.slots.forEach(element => {
                if(element._id == booking.slotId){
                    console.log(element);
                    element.status = true;
                }
            });
            book.save();
            await bookModel.save();
            res.status(200).json({"message " : "Success" });
            

            const transporter=nodemailer.createTransport({

            service:'gmail',
        auth:{
                user:'esalonbookings@gmail.com',
                pass:'Esalon@123'
             }
        });
        let mailOptions={
            from:'esalonbookings@gmail.com',
            to: booking.userEmail,
            subject: 'Salon Booking Confirmation',
            text: 'Shop Name : ' +  bookModel.shopName + ' Date : ' +bookModel.date + ' Time : ' + bookModel.time + ' Toatal Cost : ' + bookModel.totalCost
        }
        transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log('Email Sent');
        }
})
        }
    }catch(err)
    {
        res.send(err);
    }
})

route.post('/bookSlot',async(req,res)=>{
    const booking={};
    booking.shopId=req.body.shopId;
    booking.userEmail=req.body.userEmail;
    booking.shopName=req.body.shopName;
    booking.date=req.body.date;
    booking.slotId=req.body.slotId;
    booking.time=req.body.time;
    booking.totalCost=req.body.totalCost;
    booking.service=req.body.service;
    let bookModel=new Booking(booking);
    await bookModel.save();
    try{
        var book=await SlotAvailability.findOne({shopId:booking.shopId,date:booking.date});
        
        // book.shopName="amazon";
        // book.save();
        if(book){
            book.slots.forEach(element => {
                if(element._id == booking.slotId){
                    console.log(element);
                    element.status = true;
                }
            });
            book.save();
        }
    }catch(err)
    {
        res.send(err);
    }
})

route.post('/getBookingByEmail',(req,res)=>{
    
    console.log(req.body.userEmail);


    Booking.find({
        userEmail:req.body.userEmail
    },(err,result)=>{
        if(!err){
            res.status(200).json(result);
        }
        else{
            res.status(404).json(err);
        }
    })
})


module.exports=route;

