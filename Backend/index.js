const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./config/db');
require('dotenv').config();
const Router = require('./Router/index');
const path = require('path');
const ADMIN_URL = process.env.Admin_url;
const FRONTEND_URL = process.env.Frontend_url;
const app = express();
const server = http.createServer(app);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use(
  cors({
    origin: [`${ADMIN_URL}`, `${FRONTEND_URL}`],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.TOKEN_SECRET_KEY,
    resave: false,
    saveUninitialized: false, // Ensure session is not initialized unnecessarily
    cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true },
    store: new session.MemoryStore(), // Replace with a persistent store in production
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', Router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8077;


connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('DB connected');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });


