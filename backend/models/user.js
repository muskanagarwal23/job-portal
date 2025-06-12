const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {            
    type: String,
    required: true,
    unique: true,
  },
  companyEmail: {      
    type: String,
    required: function () {
      return this.role === 'employer';
    },
    unique: false,     
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'employer'],
    required: true,
  },
   resetToken: {
    type: String,
  },
  resetTokenExpire: {
    type: Date,
  },
  phone:{
    type:String
  },
  profileImage:{
  type:String 
 },
  
  resumeFile:{
    type:String
  },
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
