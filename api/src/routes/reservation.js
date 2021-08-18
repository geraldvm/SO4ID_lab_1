const { Router } = require('express');
const router = new Router();
//var spaceModule = require('./spaces');
var reservations = require('../data/reservation.json');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - time
 *         - id_Space
 *         - car_plate
 *         - time
 *       properties:
 *         id_space:
 *           type: number
 *           description: Id del espacio a reservar
 *         time:
 *           type: string
 *           description: Hora de la reserva
 *         car_plate:
 *           type: string
 *           description: Placa del vehiculo que va a usar el espacio
 *       example:
 *         id_space: 1
 *         car_plate: d5fE_asz
 *         time: 1:00
 */

/**
 * @swagger
 * /reservations:
 *  get:
 *    tags: [Reservations]
 *    summary: Solicitar todas las reservaciones
 *    responses:
 *      200:
 *        description: Una respuesta exitosa
 */
router.get('/', (req, res) => {
    res.status(200).json(reservations);
});


/**
 * @swagger
 * /spaces:
 *  get:
 *    tags: [Spaces]
 *    summary: Solicitar los espacios por paginacion se busca la pagina page de tamaño size
 *    responses:
 *      200:
 *        description: Una respuesta exitosa
 */
 router.get('/p/', (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const index = page*size;
    if (page==0){
        res.json(reservations.slice(index,index+size));
    }else{
        res.json(reservations.slice(index,index+size+1));
    }
});

/**
 * @swagger
 * /spaces:
 *  get:
 *    tags: [Spaces]
 *    summary: Solicitar los espacios por paginacion y filtro de estado
 *    responses:
 *      200:
 *        description: Una respuesta exitosa
 */
 router.get('/fp/', (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const filter = req.query.filter;
    const index = page*size;
    const temp = reservations.filter(reservation => reservation.time==filter)
    if (page==0){
        res.json(temp.slice(index,index+size));
    }else{
        res.json(temp.slice(index,index+size+1));
    }
});

/**
 * @swagger
 * /spaces:
 *  get:
 *    tags: [Spaces]
 *    summary: Solicitar solo los espacios con el estado del filtro
 *    responses:
 *      200:
 *        description: Una respuesta exitosa
 */
 router.get('/f/', (req, res) => {
    const filter = req.query.filter;
    res.json(reservations.filter(reservation => reservation.time==filter));
});



router.get('/test', (req, res) => {
    const js = {
        name: 'dev',
        value: 'testing'
    };
    res.json(js);
});

/**
 * @swagger
 * /reservations/:
 *   post:
 *     summary: Crea una nueva reservación
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: La reservación fue exitosa
 *       405:
 *         description: El espacio ya está reservado
 */
router.post('/', (req, res) => {
    const { car_plate, id_space, time } = req.body;
    const newReservation = { ...req.body };
    if (car_plate && id_space && time) {
        reservations.forEach((reservation, i) => {
            if (reservation.id_space === id_space) {
                res.status(405).json({ error: 'There was an error. This space is reserved' });
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
        res.status(200).json({ Ok: 'Space reserved' });

    } else {
        res.status(405).json({ error: 'Data incompleted!' });
    }
});

/**
 * @swagger
 * /reservations/{id}:
 *  put:
 *    summary: Actualizar una reservación
 *    tags: [Reservations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: El id del espacio
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reservation'
 *    responses:
 *      200:
 *        description: La actualización fue exitosa
 *      405:
 *        description: Ocurrió un error y no se pudo actualizar
 */
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { description, state } = req.body;
    if (id && description && state) {
        reservations.forEach((reservation, i) => {
            if (reservation.id === id) {
                reservation.description = description;
                reservation.state = state;
            }
        });
        res.status(200).send("Ok saved succesful!");
    } else {
        res.status(405).json({ error: 'There was an error.' });
    }
});


/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Eliminar una reservación por id del campo
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description:  El id del espacio
 * 
 *     responses:
 *       200:
 *         description: La reservación fue eliminada
 *       404:
 *         description: La reservación no existe
 *       402:
 *         description: Parámetros incompletos
 */
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        reservations.forEach((reservation, i) => {
            if (reservation.id_space == id) {
                reservations.splice(i, 1);
                res.status(200).json({ Ok: 'Ok reservation deleted!' });
            }

        });
        res.status(404).json({ Error: 'There was an error. This reservation not even exist' });
    } res.status(402).json({ Error: 'Please insert an id on url' });
});

router.all('/', (req, res) => {
    res.status(504).json({ Error: 'Please try with another method' });
});
router.all('/*', (req, res) => {
    res.status(504).json({ Error: 'Please try with another url' });
});

module.exports = router;