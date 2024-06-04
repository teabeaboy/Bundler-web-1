require('dotenv').config();

import { SendBundle } from './bundle-sender';
import express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';

const app = express();
const port = 2891;

app.use(bodyParser.json());
app.get('/', (_, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
});

export interface BundleData {
    blockengine: string;
    txns: string[];
}

app.post('/jitoadd', async (req, res) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", "https://bundler.space");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE, PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        res.status(405).json({ error: 'Not Allowed' });
        return;
    }

    const data: BundleData = req.body;
    console.log(data);

    // Check if any data is empty
    if (Object.values(data).some(value => value === '')) {
        res.status(400).json({ error: 'Please fill all the details' });
        return;
    }

    try {
        await SendBundle(data);
        res.status(200).json({ success: true });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: `Failed to send bundle: ${error.message}` });
    }
});

http.createServer(app).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
