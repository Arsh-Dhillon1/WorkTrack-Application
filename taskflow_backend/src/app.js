const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');

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

const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Prevent NoSQL injection
app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  next();
});

module.exports = app;
