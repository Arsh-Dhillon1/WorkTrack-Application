const express = require('express');

const app = express();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API Running');
});

const testRoutes = require('./routes/testRoutes');

app.use('/api/test', testRoutes);

const projectRoutes = require('./routes/projectRoutes');

app.use('/api/projects', projectRoutes);

module.exports = app;
