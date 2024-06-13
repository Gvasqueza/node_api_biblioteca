const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const itemRoute = require('./routes/items');

const port = process.env.PORT || 9000;
const host = process.env.APP_HOST || 'localhost';

// Middlewares
app.use(express.json());
app.use("/api", itemRoute);
app.use('/public', express.static(`${__dirname}/storage`));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log(`Server listening on port ${port}`));
