const express=require('express');
let bodyParser = require('body-parser');
const app=express();
const User=require('./Controllers/User');
const Admin=require('./Controllers/Admin')
const mongoose=require('./db')
var cors = require('cors')
app.use(cors({origin : ['http://3.21.12.92','http://localhost:4200']}));
app.use(express.json({extended:false}))
const port =7000;
app.listen(port,()=>console.log('server is running in port',port));
app.use('/user',User);
app.use('/admin',Admin);