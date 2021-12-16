require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const initRoutes = require('./services');
const port = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
initRoutes(app);

server.listen(port, async () => {
	await mongoose.connect(process.env.DB_URL);
    console.log(`Listening on http://localhost:${port}`);
});