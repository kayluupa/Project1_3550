const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getValidKeys, getExpiredKey } = require('../services/keyManager');

// Route for issuing JWTs
router.post('/auth', async (req, res) => {
    let key;
    if (req.query.expired) {
        key = getExpiredKey();    // if expired is provided, will issue a JWT signed with an expired key
    } else {
        key = getValidKeys()[0]; // Use the first valid key
    }

    if (!key) {
        return res.status(500).json({ error: 'No valid key available' });
    }

    const token = jwt.sign({ user: "testUser" }, key.key.toPEM(true), {
        algorithm: 'RS256',
        keyid: key.kid,
        expiresIn: '1h' // Set the JWT to expire in 1 hour
    });

    res.json({ token });
});

module.exports = router;
