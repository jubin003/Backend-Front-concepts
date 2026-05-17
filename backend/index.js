const express= require('express')
const mongoose= require('mongoose')

const Product= require('./models/product.model.js');
const productRoute= require('./routes/product.route.js');



const app = express()

app.use(express.json)

app.use('/api/products',productRoute);

mongoose.connect("mongodb+srv://jubin:jubin003@cluster0.ehkf1kh.mongodb.net/node-api?appName=Cluster0").then(()=>{
    console.log('connected to DB')
})
.catch(()=>{
    console.log('not connected')
})

app.listen(3000,()=>{
    console.log('hello')
})

app.get('/',(req,res)=>{
    res.send('hello from "/adsasd"')
});








app.post('/api/products',async(req,res)=>{
    const product = Product.create(req.body);
    res.status(200).json(product)
})