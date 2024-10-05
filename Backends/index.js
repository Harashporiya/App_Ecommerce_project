const { config } = require("dotenv");
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000;
config()
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/", async(req,res)=>{
    return res.send("Harash")
})

app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))