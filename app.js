const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const tasksRoutes = require('./api/routes/tasks');
const userRoutes = require('./api/routes/user');
const projectsRoutes = require('./api/routes/projects');

// Connect to Mongo DB 'test' using mongoose
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// To log every request
app.use(morgan('dev'));

// Parsing the body of request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Adding CORS support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Routing to specific routes
app.use('/tasks', tasksRoutes);
app.use('/projects', projectsRoutes);
app.use('/user', userRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
