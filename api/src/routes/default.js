const { Router } = require('express');

const router = new Router();

router.all('/*', (req, res) => {
    res.status(504).json({Error: 'Plese try with another url'});
});


module.exports = router;