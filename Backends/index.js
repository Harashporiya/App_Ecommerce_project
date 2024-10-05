const { config } = require("dotenv");
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const PORT = 5000;
config()
const productRouter = require("./routes/product")

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get("/", async(req,res)=>{
    return res.send("Harash")
})

app.use(express.json())
app.use("/api", productRouter);

app.listen(PORT,()=>console.log(`Server Started At PORT: ${PORT}`))