import express from 'express';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// Create Express application instance
const app = express();

// Route handler
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start server
// Listen for requests on PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});