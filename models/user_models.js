const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is require']
    },
    phone:{
        type:Number,
        required:[true,'Phone number is required']
    },
    email:{
        type:String,
        required:[true,'Email is require']
    },
    password:{
        type:String,
        required:[true,'Password is require']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isServiceProvider:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[],
    },
    seenNotification:{
        type:Array,
        default:[]
    },

});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;