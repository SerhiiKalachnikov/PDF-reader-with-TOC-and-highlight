const express = require('express');
const path = require('path');
const app = express();
const port = 8082;
const cors = require('cors'); // Import the cors middleware

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Disposition',
      'Content-Type',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Content-Disposition', 'Authorization'],
  }),
);

app.get('/test', (req, res) => {
  res.send('Hello World');
});

app.get('/download', (req, res) => {
  res.download(path.join(__dirname, 'public', 'test.pdf'), 'test.pdf');
});

// Middleware to set CORS headers for static files
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, OPTIONS, DELETE, PATCH',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Disposition, Content-Type, Origin, X-Requested-With',
  );
  res.header(
    'Access-Control-Expose-Headers',
    'Content-Disposition, Authorization',
  );
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
