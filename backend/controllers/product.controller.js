const Product= require('./models/product.model.js');

const getProduct = async(req,res)=>{
    try{
        const product= await Product.find();
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({mesasge:error.mesasge})
    }

};

module.exports={
    getProduct
}