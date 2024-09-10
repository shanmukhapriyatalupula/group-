const express = require('express');
const path = require('path');

const app = express();

// Define the port number
const PORT = 5500;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Handle requests to the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
