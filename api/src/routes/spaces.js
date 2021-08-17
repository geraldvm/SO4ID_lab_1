const { Router } = require('express');
const router = new Router();

var spaces = require('../data/spaces.json');

router.get('/', (req, res) => {
    res.json(spaces);
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id ) {
        spaces.forEach( (space, i) => {
            if (space.id === id) {
                res.status(200).send(JSON.stringify({id: space.id, description: space.description, state:space.state}));
            }
        });
    } else {
        res.status(405).json({error: 'There was an error.'});
    }
});

router.get('/test', (req, res) => {
    const js = {
        name: 'dev',
        value: 'testing'
    };
    res.json(js);
});  


router.post('/', (req, res) => {
    const id = spaces.length + 1;
    const description  = req.body;
    const state = 'free';
    const newSpace = { ...req.body, id , state};
    spaces.push(newSpace);
    res.status(200).json({OK:'Saved succesful!'});
    /*} else {
        res.status(500).json({error: 'There was an error.'});
    }*/
    //console.log(data);
});


router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { description, state } = req.body;
    if (id && description && state ) {
        spaces.forEach( (space, i) => {
            if (space.id === id) {
                space.description = description;
                space.state = state;
            }
        });
        res.status(200).json({OK:'Ok saved succesful!'});
    } else {
        res.status(405).json({error: 'There was an error.'});
    }
});



router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        spaces.forEach( (space, i) => { 
            if (space.id == id) {
                spaces.splice(i, 1);
                res.status(200).json({OK: 'Ok space deleted!'});
            }
            
        });
        res.status(200).json({Error: 'There was an error. This space not exist'});
    }res.status(200).json({Error: 'Please insert an id on url'});
});

router.all('/', (req, res) => {
    res.status(504).json({Error: 'Please try with another method'});
});
router.all('/*', (req, res) => {
    res.status(504).json({Error: 'Please try with another url'});
});

exports.spaces= spaces;
module.exports = router;
