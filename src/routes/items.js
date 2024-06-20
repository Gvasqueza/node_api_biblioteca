const express = require('express');
const itemSchema = require('../models/items.js');
const multer = require('multer');
const upload = require('../librerias/storage');
const router = express.Router();

// // Configure Multer for buffer storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// POST item with image and content
router.post("/items", upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'contenido', maxCount: 1 }
]), (req, res) => {
    const { titulo, autor, tipo, genero } = req.body;
    const item = new itemSchema({ titulo, autor, tipo, genero });
    
    // Handle image upload
    if (req.files['imagen']) {
        const imagenFile = req.files['imagen'][0];
        const { filename } = imagenFile;
        item.setImgUrl(filename); // Set the image URL
    }
    
    // Handle content upload
    if (req.files['contenido']) {
        const contenidoFile = req.files['contenido'][0];
        item.contenido = contenidoFile.buffer; // Store the file as a Buffer
    }
    
    item.save()
        .then((savedItem) => res.json(savedItem))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// GET all items
router.get("/items", (req, res) => {
    itemSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// GET item by ID
router.get("/items/:id", (req, res) => {
    const { id } = req.params;
    itemSchema.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// UPDATE item
router.put("/items/:id", upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'contenido', maxCount: 1 }
]), (req, res) => {
    const { id } = req.params;
    const { titulo, autor, tipo, genero } = req.body;
    const updateData = { titulo, autor, tipo, genero };
    
    if (req.files['imagen']) {
        const imagenFile = req.files['imagen'][0];
        updateData.imagen = `${req.protocol}://${req.get('host')}/public/${imagenFile.filename}`;
    }
    
    if (req.files['contenido']) {
        const contenidoFile = req.files['contenido'][0];
        updateData.contenido = contenidoFile.buffer; // Store the file as a Buffer
    }
    
    itemSchema.updateOne({ _id: id }, { $set: updateData })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// DELETE item
router.delete("/items/:id", (req, res) => {
    const { id } = req.params;
    itemSchema.deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
