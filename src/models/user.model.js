const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username:{
        type:String,
        min:6,
        max:32,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        min:8,
        max:50,
        required:true
    },
    email:{
        type:String,
        min:8,
        max:50,
        required:true
    },
    score: {
        type: Number,
        default: 0,
        sortable: true
      }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
