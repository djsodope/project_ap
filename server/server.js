const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // <-- Add this line

const app = express();
app.use(cors({
<<<<<<< HEAD
  origin: ['http://localhost:3000', 'https://your-app.vercel.app'],
=======
  origin: '*', // Allow all origins for testing; restrict in production!
>>>>>>> 2f65b266f7e9a526ce197b73666a4fd6ee01532f
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB Atlas using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/characters', require('./routes/characters'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));