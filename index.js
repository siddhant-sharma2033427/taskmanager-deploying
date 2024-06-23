import express from 'express';
import cors from 'cors';
import Connection from './db/db.js';
import Route from './routes/route.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000; // Use process.env.PORT for deployment environments

app.use(cors());
app.use(express.json());

// Database connection
Connection();

// API routes
app.use('/api', Route);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'taskmanager', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'taskmanager', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Task Manager backend listening at http://localhost:${port}`);
});
