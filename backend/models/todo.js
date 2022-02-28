const mongoose= require("mongoose");
const todoSchema= new mongoose.Schema({
    uid:String,
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    author:{
        type:String,
        minlength:3,
        maxlength:30
        
    },
    isComplete:Boolean,
    date:{
        type:Date,
        default:new Date()
    }
});

const Todo= mongoose.model('Todo',todoSchema);

exports.Todo=Todo;
