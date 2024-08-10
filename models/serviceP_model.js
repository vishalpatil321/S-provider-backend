const mongoose = require('mongoose');

const servicePSchema = new mongoose.Schema({
  userId:{
    type:String
  },
  firstName:{
    type:String,
    required:[true,'First name is required']
  },
  lastName:{
    type:String,
    required:[true,'Last name is required']
  },
  phone:{
    type:Number,
    required:[true,'Phone number is required']
  },
  email:{
    type:String,
    required:[true,'Email is required']
  },
  website:{
    type:String,
    
  },
  address:{
    type:String,
    required:[true,'Address is required']
  },
  specialization:{
    type:String,
    required:[true,'Specialization is required']
  },
  experience:{
    type:String,
    required:[true,'Experience is required']
  },
  feesPerService:{
    type:Number,
    required:[true,'Fees is required']
  },
  status:{
    type:String,
    default:'Pending'
  },
  timings:{
    type:Object,
    required:[true,'Work timing is required']
  },
},{timestamps:true}
);

const servicePModel =  mongoose.model('services',servicePSchema);

module.exports = servicePModel;