import Task from '../models/task.model.js'

export const getTasks= async(req,res)=>{
    try{
        const task= await Task.find();
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getTask= async(req,res)=>{
    try{
        const id = req.params;
        const task = await Task.findById(id.id);
        if(task){
            res.status(200).json(task);
        }else{
            res.json({message:'no such task.'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const createTask= async(req,res)=>{
    try{
        const content= await Task.create(req.body);
        if(content){
            res.status(201).json(content)
        }else{
            res.json({message:'need a task'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteTask = async(req,res)=>{
    try{
        const id = req.params.id;
        if(id){
            await Task.findByIdAndDelete(id);
            res.status(204).json({message:`${id} deleted`})
        }else{
            res.status(404).json({message:'does not exist'})
        }

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const updateTask = async(req,res)=>{
    try{
        const id= req.params.id;
        if(id){
            await Task.findByIdAndUpdate(id,req.body);
            res.status(200).json({message:`${id} updated`})
        }else{
            res.staus(404).json({message:'task does not exist'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

