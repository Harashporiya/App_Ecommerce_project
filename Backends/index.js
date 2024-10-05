const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000;

app.get("/", async(req,res)=>{
    return res.send("Harash")
})

app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))