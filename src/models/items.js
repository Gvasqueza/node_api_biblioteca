const mongoose = require('mongoose');
require('dotenv').config();

const itemSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    tipo: { type: String },
    imagen: { type: String },
    genero: { type: String },
    contenido: { type: Buffer } // nuevo campo para almacenar el archivo como buffer
});

itemSchema.methods.setImgUrl = function setImgUrl(filename) {
    const host = process.env.APP_HOST || 'localhost';
    const port = process.env.PORT || 9000;
    this.imagen = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model('item', itemSchema);
