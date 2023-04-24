import fs from "fs";
import path from "path";
import {__dirname} from "../utils.js";

class ProductManager{
    constructor(pathName){
        this.path=path.join(__dirname,`/files/${pathName}`);
    }

    fileExists(){
        return fs.existsSync(this.path);
    };

    generateId(products){
        let newId;
        if(!products.length){
            newId=1;
        } else{
            newId=products[products.length-1].id+1;
        }
        return newId;
    }

    async addProduct(product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productId = this.generateId(products);
                product.id = productId;
               
                products.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                return product;
            } else {
                const productId = this.generateId([]);
                product.id = productId;
               
                await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                return product;
            }
        } catch (error) {
           
            throw new Error(error.message);
        }
    };

    async getProducts(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
           
            throw new Error(error.message);
        }
    };

    async getProductById(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const product = products.find(item=>item.id === parseInt(id));
                if(product){
                    return product;
                } else {
                    return null;
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            
            throw new Error(error.message);
        }
    };

    async updateProduct(id,product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(item=>item.id === parseInt(id));
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
           
            throw new Error(error.message);
        }
    };

    async deleteProduct(id){
      try {
          if(this.fileExists()){
          const content = await fs.promises.readFile(this.path,"utf-8");
          const products = JSON.parse(content);
          const product = products.find(item=>item.id === parseInt(id));
    
          if(product){
            const producter = products.filter(item=>item.id !== parseInt(id));
            products.splice(id-1,1);
            await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
            return producter;
          } else {
            return null;
        }
    } 
    } catch (error) {  
      throw new Error(error.message);
    }

  };
}

export {ProductManager}