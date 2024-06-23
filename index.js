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
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', Route);
Connection();

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "taskmanager", "build")));
    res.sendFile(path.resolve(__dirname, "taskmanager", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
