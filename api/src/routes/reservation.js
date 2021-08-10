const { Router } = require('express');
const router = new Router();
//var spaceModule = require('./spaces');
var reservations = require('../data/reservation.json');

//var spaces = spaceModule.spaces;

router.get('/', (req, res) => {
    res.send(reservations);
});

router.get('/test', (req, res) => {
    const js = {
        name: 'dev',
        value: 'testing'
    };
    res.json(js);
});  


router.post('/', (req, res) => {
    const { car_plate, id_space, time } = req.body;
    const newReservation = { ...req.body};
    if (car_plate && id_space && time ) {
        reservations.forEach( (reservation, i) => {
            if (reservation.id_space === id_space) {
                res.status(405).json({error: 'There was an error. This space is reserved'});
            }
        });
        /*spaces.forEach( (space, i) => {
            if (space.id === id_space) {
                reservations.push(newReservation);
                reservations.status(200).json({Ok: 'Space reserved'});
            }
        });
        res.status(405).json({error: 'There was an error in id space'});*/
        reservations.push(newReservation);
        res.status(200).json({Ok: 'Space reserved'});
        
    } else {
        res.status(405).json({error: 'Data incompleted!'});
    }
});


router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { description, state } = req.body;
    if (id && description && state ) {
        reservations.forEach( (reservation, i) => {
            if (reservation.id === id) {
                reservation.description = description;
                reservation.state = state;
            }
        });
        res.status(200).send("Ok saved succesful!");
    } else {
        res.status(405).json({error: 'There was an error.'});
    }
});



router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        reservations.forEach( (reservation, i) => { 
            if (reservation.id_space == id) {
                reservations.splice(i, 1);
                res.status(200).json({Ok: 'Ok reservation deleted!'});
            }
            
        });
        res.status(200).json({Error: 'There was an error. This reservation not even exist'});
    }res.status(200).json({Error: 'Please insert an id on url'});
});

router.all('/', (req, res) => {
    res.status(504).json({Error: 'Please try with another method'});
});
router.all('/*', (req, res) => {
    res.status(504).json({Error: 'Please try with another url'});
});

module.exports = router;