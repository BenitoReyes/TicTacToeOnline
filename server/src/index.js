import dotenv from 'dotenv';      
import express from 'express';
import cors from 'cors';
import { StreamChat } from 'stream-chat';
import {v4 as uuidv4 } from 'uuid';
import bycrypt from 'bcrypt';
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({ path: './src/streamSec.env' });
const api_key = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const serverClient = StreamChat.getInstance(api_key, apiSecret);
app.post('/signup', async (req, res) => {
  try{
  const { firstName, lastName, username, password } = req.body;
  const userId = uuidv4();
  const hashedPassword = await bycrypt.hash(password, 10);
  const token = serverClient.createToken(userId);
  res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await serverClient.queryUsers({ name: username });
    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = serverClient.createToken(user[0].id);
    res.status(200).json({ userId: user[0].id, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Correctly register /api-key endpoint at the top level
app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
