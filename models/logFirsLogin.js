const mongoose = require('mongoose');
const config = require('config');

const logFirsLoginSchema = new mongoose.Schema({
  idNumber: { 
    type: String, 
    minLength:11,
    maxLength:11,
    required: true
     },
  saveDate: { 
    type: String
    ,required:true,
    minLength:10,
    maxLength:10,
  },
  saveTime:{
    type: String,
    minLength:5,
    maxLength:5,
    required:true,
  },
  code: {
     type: String, 
     minLength:7,
    maxLength:11, 
    required: true
  }
});

const logFirsLogin = mongoose.model('logFirsLogin', logFirsLoginSchema);

exports.logFirsLogin = logFirsLogin;
 