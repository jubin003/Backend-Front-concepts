import Task from '../models/task.model.js'
import cache from '../cache/cache.js';

export const getTasks= async(req,res)=>{

    try{
        const cached= cache.get('tasks')

        if(cached){
            return res.status(200).json(cached);       
        } 
        const {priority}= req.query;
        const filter={};
        if(priority){
            filter.priority=priority;
            
        }
        const task= await Task.find({...filter,userId:req.auth.id});
        cache.set('tasks',task)
        res.status(200).json(task);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getTask= async(req,res)=>{
    try{
        const id = req.params.id;
        const cached= cache.get(`task-${id}`);
        if(cached){
            return res.status(200).json(cached);
        }
        
        const task = await Task.findById(id);
        if(task.userId.toString()!==req.auth.id){
            return res.status(403).json({message:'access denied'})
        }
        cache.set(`task-${id}`,task);
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
        const content= await Task.create({...req.body,userId:req.auth.id});
        if(content){
            cache.del('tasks');
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
            const tesk= await Task.findById(id);
            if(!tesk){
                return res.status(404).json('no user')
            }
            
            if(task.userId.toString()!==req.auth.id){
                const task =await Task.findByIdAndDelete(id);
                return res.status(403).json({message:'action denied'});
            }
            cache.del('tasks')
            cache.del(`task-${id}`)
            res.status(200).json({message:`${id} deleted`})
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
            const tesk= await Task.findById(id);
            if(!tesk){
                return res.status(404).json('no user')
            }
            
            
            if(task.userId.toString()!==req.auth.id){
                cache.del('tasks')
                cache.del(`task-${id}`)
                const task =await Task.findByIdAndUpdate(id,req.body);
                return res.status(403).json({message:'action denied'});
            }
           
            res.status(200).json({message:`${id} updated`,task})
        }else{
            res.status(404).json({message:'task does not exist'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

