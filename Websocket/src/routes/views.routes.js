import {Router} from "express";
import { ProductManager } from "../managers/ProductManager.js";

const productManager=new ProductManager("products.json");

const router =Router();

router.get("/",async(req,res)=>{
    const products=await productManager.getProducts();
    res.render("home",{products});
})

router.get("/realtimeproducts",async(req,res)=>{
    const products=await productManager.getProducts();
    res.render("realTimeProducts",{products});
})


export {router as viewsRouter};