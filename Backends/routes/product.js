const express = require("express");
const Product = require("../model/product");
const router = express.Router();
const fs = require("fs").promises; // Use promises version of fs
const path = require("path");
const multer = require("multer");
const zod = require("zod");

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory for processing

// Zod schema for validation
const productZod = zod.object({
    name: zod.string({ message: "Product name is required" }).min(1),
    prise: zod.number({ message: "Price must be a positive number" }),
    image: zod.any().refine((value) => value !== undefined, {
        message: "Image must be a valid file",
    }),
});

// Route to create a product
router.post("/product", upload.single("image"), async (req, res) => {
    const { name, prise } = req.body;
    const image = req.file; // Get the uploaded file

    // Validate the incoming data
    try {
        productZod.parse({
            name,
            prise: Number(prise),
            image, // Here, image is already validated as an instance of File
        });
    } catch (error) {
        return res.status(400).json({ message: error.errors });
    }

    const fileName = `${Date.now()}.${image.originalname.split(".").pop()}`; // Get the file extension
    const filePath = path.join(process.cwd(), "public/assets", fileName);

    try {
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

        return res.status(201).json({ message: "Product created successfully",productCreate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
