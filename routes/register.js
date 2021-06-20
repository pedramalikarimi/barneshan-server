const {RegisterNumber,validate} = require('../models/registerModel');

const {logFirsLogin}=require('../models/logFirsLogin')
const express=require('express');
const winston=require('winston');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const  DateFa =require('../Startup/date');

router.get('/isRegister/:mobile',async(req,res)=>{
  let register = await RegisterNumber.find({
    idNumber:req.params.idNumber});
  // if (!register)
  //   res.status(405).json({id: ""})
 
  // res.status(200).json({id: Register._id});
  res.send(register)
})

router.get('/checkCode',async(req,res)=>{
  let dates=DateFa.convertDate();
  let trust = await logFirsLogin.find({
    idNumber:req.body.number,code:req.body.code,saveDate:dates});
  if (trust)
    res.status(201).json({trust:true})
    else
    res.status(405).json({trust:false});
})


//GEneration oF Code 


router.post('/GetCode',async (req,res)=>{
  const randomCode=(Math.floor(1000000 + Math.random() * 9000000)).toString();
   let dates=DateFa.convertDate();
   var time = new Date();
 
   let loginLog=new logFirsLogin({
  idNumber:req.body.idNumber,
  code:randomCode,
  saveDate:dates,
  saveTime:(time.getHours() <10 ? "0" + time.getHours() : time.getHours())
            +":"+(time.getMinutes() <10 ? "0"+time.getMinutes() : time.getMinutes())
 });
 loginLog=await loginLog.save().then((vale=>{
  return  res.status(200).json({isSend: true})
})).catch((err)=>{
  return res.status(405).json({isSend :false,err:err});
});

 
})


router.post('/set/adduser',async(req,res)=>{

  //  const { error } = validate(req.body);
  //    if (error) return res.status(400).send(error.details[0].message);

   let register = await RegisterNumber.findOne({
     idNumber:req.body.idNumber});
     if (register) return res.status(400).json({result:-1});
  
   register = new RegisterNumber({
    idNumber :req.body.idNumber
    // bcrypt.hashSync(req.body.idNumber,8)
  });
  register=await register.save().then((vale=>{
    return res.status(201).json({result : 1});
  })).catch((err)=>{
    return res.status(405).json({result :0});
  });
 
     
   
});

module.exports=router;