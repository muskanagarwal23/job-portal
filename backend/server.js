const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('public/uploads'));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes); 
app.use('/api/applications', applicationRoutes);
app.get('/', (req, res) => {
  res.send('API is running...');
});
console.log("🛠 Mounting /api/employer route");

app.use('/api/employer', dashboardRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});