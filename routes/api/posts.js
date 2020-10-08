const express = require('express');
const request = require('request');
const router = express.Router();


router.get('/', (req, res) => {
    request({
        uri: 'https://jsonplaceholder.typicode.com/posts',
    })
    .pipe(res);
});

router.get('/:id', (req, res) => {
    request({
        uri: `https://jsonplaceholder.typicode.com/posts?userId=${req.params.id}`,
    })
    .pipe(res);
});

module.exports = router;