const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser')
const  connection = require('./db');
const userRouter= require('./routes/userRoutes');
const NotesRouter = require('./routes/NotesRouter');


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/user",userRouter)
app.use("/notes",NotesRouter)


// Start the server
const PORT = process.env.PORT || 3030;

app.listen(PORT,  async() => {
    try {
        await connection;  // Ensure DB connection is successful
        console.log('Connected to the database');
        console.log(`Server is running on port: ${PORT}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        process.exit(1);  // Exit with a failure code if DB connection fails
    }
});

