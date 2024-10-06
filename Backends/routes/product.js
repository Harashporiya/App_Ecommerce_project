const express = require("express");
const Product = require("../model/product");
const router = express.Router();
const fs = require("fs").promises; // Use promises version of fs
const path = require("path");
const multer = require("multer");
const zod = require("zod");

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory for processing

// Define Zod schema for product validation
const productSchema = zod.object({
    name: zod.string().min(1, "Name is required"),
    prise: zod.number().min(0, "Price must be a positive number"),
});

// Route to create a product
router.post("/product", upload.single("image"), async (req, res) => {
    const { name, prise } = req.body;
    const image = req.file; // Get the uploaded file

    // Validate the input data
    try {
        productSchema.parse({ name, prise: Number(prise) }); // Validate input

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const fileName = `${Date.now()}.${image.originalname.split(".").pop()}`; // Get the file extension
        const filePath = path.join(process.cwd(), "public/assets", fileName);

        // Ensure the assets directory exists
        const assetsPath = path.dirname(filePath);
        await fs.mkdir(assetsPath, { recursive: true }); // Use async version

        // Write the file buffer to the file system
        await fs.writeFile(filePath, image.buffer);

        // Create the product in the database
        const productCreate = await Product.create({
            name,
            prise: Number(prise),
            image: `/assets/${fileName}`,
        });

        return res.status(201).json({ message: "Product created successfully", productCreate });
    } catch (error) {
        if (error instanceof zod.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/all/products", async(req,res)=>{
    try {
        const allProduct = await Product.find({})
        if(!allProduct){
            return res.status(404).json({message:"Product not found"})
        }
        return res.status(200).json({message:"Fetch all product"})
    } catch (error) {
        return res.status(500).json({message:"Failed fetch product"})
    }
})
module.exports = router;
