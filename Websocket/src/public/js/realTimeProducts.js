const socketClient =io();
const chatHistory=document.getElementById("chatHistory");

socketClient.on("chatMessages",(product)=>{
    chatHistory.innerHTML="";
    product.forEach(itemMsg => {
        const parrafo=document.createElement("p");
        parrafo.innerHTML=`${itemMsg}`;
        chatHistory.appendChild(parrafo);
    });
})