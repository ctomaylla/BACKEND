import express from"express";
import {Server}from"socket.io";
import handlebars from "express-handlebars";
import {viewsRouter} from "./routes/views.routes.js";
import { ProductManager } from "../src/managers/ProductManager.js";
import {__dirname} from "./utils.js";
import path from "path";


const app=express();
const port=8080;

app.use(express.static(path.join(__dirname,"/public")));

const httpServer=app.listen(port,()=>console.log(`Servidor Activo ${port}`));

const socketServer=new Server(httpServer);

app.engine('.hbs',handlebars.engine({extname:'.hbs'}));
app.set('view engine','.hbs');
app.set('views',path.join(__dirname,"/views"));

app.use(viewsRouter);


let product=[];
socketServer.on("connection",(socket)=>{
    console.log(`Nuevo socket cliente conectado ${socket.id}`);
    const productManager=new ProductManager("products.json");
    const products= productManager.getProducts();
    socket.emit("chatMessages",products);

    socket.on("products",()=>{
        product.push({products});
        socketServer.emit("chatMessages",product);
    });
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));


