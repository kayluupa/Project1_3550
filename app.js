const express = require('express');            // framework for server
const bodyParser = require('body-parser');     // parses incoming json requests
const jwksRouter = require('./routes/jwks');   // import json webkey set
const authRouter = require('./routes/auth');   // import JWT generation
const { generateKey } = require('./services/keyManager');    // creates initial rsa key when server starts

const app = express();
app.use(bodyParser.json());

// Use the JWKS and Auth routes
app.use('/', jwksRouter);
app.use('/', authRouter);

// Generate a key when the server starts
generateKey();

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
