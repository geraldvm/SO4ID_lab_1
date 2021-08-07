const { Router } = require('express');
const router = new Router();

const data = require('../data.json');

router.get('/', (req, res) => {
    res.json(data);
});

router.get('/test', (req, res) => {
    const js = {
        name: 'dev',
        value: 'testing'
    };
    res.json(js);
});  


router.post('/', (req, res) => {
    const id = data.length + 1;
    //const { title, director, year, rating } = req.body;
    const newSpace = { ...req.body, id };
    //if (id && title && director && year && rating) {
        data.push(newSpace);
        res.status(200).json("Ok saved succesful!");
    /*} else {
        res.status(500).json({error: 'There was an error.'});
    }*/
});

module.exports = router;