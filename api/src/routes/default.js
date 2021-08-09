const { Router } = require('express');

const router = new Router();

router.all('/*', (req, res) => {
    res.status(504).json({Error: 'Please try with another url'});
});


module.exports = router;