const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

const registerSchema = new mongoose.Schema({
  idNumber: { 
    type: String, 
    minLength:11,
    maxLength:11,
    required: true,
      unique: true
   },
  dateRegister: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const RegisterNumber = mongoose.model('RegisterNumber', registerSchema);
function validRegister(user) {
  const schema = 
  {
    idNumber: Joi.string()
      .min(11)
      .max(1024)
      .required()
      .unique()
  };
  return Joi.validate(user, schema);
}

registerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      idNumber: this.idNumber,
      isAdmin: this.isAdmin
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

exports.RegisterNumber = RegisterNumber;
exports.validate = validRegister;