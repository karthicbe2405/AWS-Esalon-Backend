const express=require('express');
const { db } = require('../Models/Admin');
const Admin=require('../Models/Admin');
const Shop =require('../Models/Shop');
const Slot=require('../Models/Slot');
const SlotAvailability=require('../Models/SlotAvailability');
const route =express.Router();
const booking=require('../Models/Bookings');

route.post('/adminLogin',async(req,res)=>{
    try{
        const admin=await Admin.findOne({
            AdminId:req.body.adminId
        })
        if (!admin) {
            return res.status(404).send("Invalid Id!");
        }
        const password=req.body.adminPassword;
        if(password == admin.AdminPassword)
        {
            return res.status(200).json({"message":"Login successful"});
        }
        return res.status(404).send("Incorrect Password!");
    }
    catch(err){
        console.log("Error:",err);
    }
});
route.post('/addShop',async(req,res)=>{
    const {shopName,shopAddress,shopImage}=req.body;
    const shop={};
    shop.shopName=shopName;
    shop.shopAddress=shopAddress;
    shop.shopImage=shopImage;
    let shopModel=new Shop(shop);
    await shopModel.save();
    res.status(200).json({"message":"Shop Added"});
})

route.get('/getShops',(req,res)=>{

    Shop.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
})

route.put('/updateServices',async(req,res)=>{
    try{
        await Shop.findOneAndUpdate({
            _id:req.body._id,
        },{$push: {shopServices: {"serviceName":req.body.serviceName,"servicePrice":req.body.serviceCost}}},{new: false, upsert: true }).exec();
        res.status(200).json({"message":"service Added"});
    }
    catch(err){
        console.log(err);
        res.status(404);
    }
})

route.put('/addSlot',async(req,res)=>{
    let id=req.body._id;
    let SlotId=req.body.slot;
    console.log(req.body.slot);
    try{
        var slot=await Slot.findOne({shopId:id});
        console.log(slot);
        if(slot){
            Slot.findOneAndUpdate(
                {shopId: id}, 
                {$push: {slots: {"slotId":SlotId,"status":false}}},{new: false, upsert: true }).exec();
                res.status(200).json({"message":"slot Added"});
                }
        else{
            var slotModel=new Slot({
                shopId:id
            })
            
            slotModel.save();
            
            console.log(slotModel._id);
            //const {name , id} = req.body
            Slot.findOneAndUpdate(
                {shopId:id}, 
                {$push: {slots: {"slotId":SlotId,"status":false}}},{new: false, upsert: true }).exec();
                res.status(200).json({"message":"slot Added"});
                }
                console.log(slotModel);
    }
    catch(err){
        res.status(404);
    }
})
route.post('/generateSlot',async(req,res)=>{
    console.log(req.body.date);
    var date=req.body.date;
    var ShopId=req.body.shopId;
    const slot=await Slot.findOne({
        shopId:ShopId,
    })
    if(slot){
        try{
            var SA=new SlotAvailability({
                shopId:slot.shopId,
                date:date,
                slots:slot.slots,
            })
            SA.save();
            res.status(200).json({"message":"slot Generated"});
        }
        catch{
            res.status(404);
        }
        
    }
})

route.get('/getBooking',(req,res)=>{
    booking.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
})

module.exports=route;