const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    servicePId:{
        type:String,
        required:true
    },
    servicePInfo:{
        type:Array,
        required:true,
        default:[]
    },
    userInfo:{
        type:Array,
        required:true,
        default:[]
    },
    // date:{
    //     type:String,
    //     required:true
    // },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    // time:{
    //     type:String,
    //     required:true
    // }
},{timestamps:true})

const appointmentModel = mongoose.model('appointments',appointmentSchema);

module.exports = appointmentModel;