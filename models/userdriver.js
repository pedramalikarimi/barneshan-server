const config=require('config');
const Joi=require('joi');
const mongoose=require('mongoose');


const UserDriverSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String,
        min:5,
        max=100
    },
    address:{
        type:new mongoose.Schema({
             state:{type:String,required:true},
        city:{type:String,required:true}
        }),
        required:true
       
    },
    truck:{
        type:new mongoose.Schema({
        name:{type:String,required:true},
        model:{type:String,required:true}
    }),
    required:true
    },
    profileImage:{type:String},
    truckImage:{type:String},
    nationalId:{type:String,required:true,max:10,min:10},
    smartNumber:{type:String,required:true,min:5,max:10},
    registerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required:true
    }
});
const UserDriver=mongoose.model('UserDriver',UserDriverSchema);
exports.UserDriver=UserDriver;
