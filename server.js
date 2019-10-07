const express = require('express');
const db = require('./queries');
// const dotenv = require('dotenv');
// dotenv.config();

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js,express and Postgres API' });
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
