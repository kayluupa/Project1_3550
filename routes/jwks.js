const express = require('express');
const router = express.Router();
const { getValidKeys } = require('../services/keyManager');

// Route for serving the JWKS
router.get('/jwks', (req, res) => {
    const validKeys = getValidKeys().map(key => key.key.toJSON());    // gets valid keys from key manager
    res.json({ keys: validKeys });
});

module.exports = router;
