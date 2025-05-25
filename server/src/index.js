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
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bycrypt.hash(password, 10);
    // Create the user in Stream Chat
    await serverClient.upsertUser({
      id: userId,
      name: username,
      firstName,
      lastName,
      hashedPassword,
    });
    const token = serverClient.createToken(userId);
    res.json({ token, userId, firstName, lastName, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Query users by name (Stream expects a filter object)
    const { users } = await serverClient.queryUsers({ name: { $eq: username } });
    if (!users || users.length === 0) {
      return res.json({ error: 'User not found' });
    }
    const user = users[0];
    const passwordMatch = await bycrypt.compare(password, user.hashedPassword);
    if (passwordMatch) {
      const token = serverClient.createToken(user.id);
      res.json({
        token,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.name,
        userId: user.id,
      });
    } else {
      res.json({ error: 'Incorrect password' });
    }
  } catch (error) {
    res.json(error);
  }
});

// Correctly register /api-key endpoint at the top level
app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.API_KEY });
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
