import {Router} from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager=new ProductManager("products.json");
console.log(productManager);

const router=Router();

router.get("/",async(req,res)=>{
try {
    const products=await productManager.getProducts();
    res.json({status:"success",data:products});
} catch (error) {
    res.status(400).json({status:"error",message:error.message});
}
})

router.post("/",async(req,res)=>{
      try {
        const {title,description,code,price,stock,category}=req.body;
        if(!title || !description || !code || !price || !stock || !category){
            return res.status(400).json({status:"error",message:"Los campos no son validos"});
        }
        const newProduct=req.body;
        const productSaved = await productManager.addProduct(newProduct);
        res.json({status:"success",data:productSaved});
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
      }
})

router.get("/:pid",async(req,res)=>{
    try {
        const productId= req.params.pid;
        const product=await productManager.getProductById(productId);
        if(product){
            res.json({status:"success",data:product});
        }else{
            res.status(400).json({status:"error",message:"No existe el producto"});
        }
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
})

router.put("/:pid",async(req,res)=>{
    try {
        const {title,description,code,price,stock,category}=req.body;
        const newProduct=req.body;
        const productId= req.params.pid;
        const product=await productManager.updateProduct(productId,newProduct);
        if(product){
            res.json({status:"success",data:product});
        }else{
            res.status(400).json({status:"error",message:"No existe el producto"});
        }
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
})

router.delete("/:pid",async(req,res)=>{
    try {
        const productId= req.params.pid;
        const product=await productManager.deleteProduct(productId);
        if(product){
            res.json({status:"success",data:product});
        }else{
            res.status(400).json({status:"error",message:`El producto con el id ${productId} no existe`});
        }
        
    } catch (error) {
        res.status(400).json({status:"error",message:error.message});
    }
})
export{router as productRouter};