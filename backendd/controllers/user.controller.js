import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt';


export const userRegister= async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        if(name.length>=5 && password.length>=8){
            const hashedpassword = await bcrpyt.hash(password,10);

            const user=await User.create({name,email,password:hashedpassword})
            if(user){
                res.status(200).json({message:`${name} account created`});
            }else{
                res.status(400).json({message:'account not created'});
            }
            
        }else{
            res.status(400).json({message:'put correct format for name and password'})
        }
    }catch(error){
        res.status(500).json({message:error.message})
    }
    
}

export const userLogin= async(req,res)=>{
    try{
        const{name,email,password}= req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'user does not exist'});
        }

        const matched = await bcrpyt.compare(password,user.password);
        if(!matched){
            return res.status(400).json({message:'incorrect password'});
        }

        const token= jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET
        )
    
        res.status(200).json({token:token});

    }catch(error){
        res.status(500).json({message:error.message})
    }
}