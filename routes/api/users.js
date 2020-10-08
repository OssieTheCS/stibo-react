const express = require('express');
const request = require('request');
const router = express.Router();


router.get('/', (req, res) => {
    request({
        uri: 'https://jsonplaceholder.typicode.com/users',
    })
    .pipe(res);
});

router.get('/:id', (req, res) => {
    request({
        uri: `https://jsonplaceholder.typicode.com/users/${req.params.id}`,
    })
    .pipe(res);
});

module.exports = router;