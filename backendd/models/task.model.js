import mongoose from 'mongoose'

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
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    }
},{
    timestamps: true
}

);

const Task=mongoose.model("Task",TaskSchema)
export default Task;
