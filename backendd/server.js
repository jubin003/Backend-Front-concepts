import dotenv from 'dotenv';
dotenv.config()

import Express from 'express';
import mongoose from 'mongoose';
import taskroute from './routes/task.route.js'
import authroute from './routes/auth.route.js'
import helmet from 'helmet';
import cors from 'cors';


const app= Express();

app.use(Express.json());

app.use(helmet());
app.use(cors({
    origin:process.env.FRONT_END_URL,
    methods:['GET','POST','DELETE','PUT','PATCH'],
    allowedHeaders:['Content-Type','authorization']
}))



mongoose.connect("mongodb+srv://jubin:jubin003@cluster0.ehkf1kh.mongodb.net/node-api?appName=Cluster0").then(()=>{
    console.log('connected to DB')
    app.listen(3000,()=>{
        console.log('this is port 3000')
    })
}).catch(()=>{
    console.log('not connected')
})


app.get('/',(req,res)=>{
    res.send(JSON.stringify({message:'hello'}));

})

app.use('/api/task',taskroute)
app.use('/api/',authroute)