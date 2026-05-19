const Express= require('express');
const mongoose = require('mongoose');
const taskroute= require('./routes/task.route.js')
const app= Express();

app.use(Express.json());



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