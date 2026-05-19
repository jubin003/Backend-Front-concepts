const mongoose = require('mongoose');


const TaskSchema= mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String
    },
    priority:{
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true
}

);

module.exports=mongoose.model("Task",TaskSchema)
