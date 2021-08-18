const { Router } = require('express');
const router = new Router();

var spaces = require('../data/spaces.json');

/**
 * @swagger
 * components:
 *   schemas:
 *     Space:
 *       type: object
 *       required:
 *         - state
 *         - id
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: Id del espacio
 *         state:
 *           type: string
 *           description: Estado de reserva del espacio
 *         description:
 *           type: string
 *           description: Descripción del campo
 *       example:
 *         id: 10
 *         statee: free
 *         description: Espacio de ley 7600
 */


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
        console.log('page0')
        res.json(spaces.slice(index,index+size));
    }else{
        res.json(spaces.slice(index,index+size+1));
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
    const temp = spaces.filter(space => space.state==filter)
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
    res.json(spaces.filter(space => space.state==filter));
});

/**
 * @swagger
 * /spaces:
 *  get:
 *    tags: [Spaces]
 *    summary: Solicitar todos los espacios
 *    responses:
 *      200:
 *        description: Una respuesta exitosa
 */
router.get('/', (req, res) => {
    res.json(spaces);
});



/**
 * @swagger
 * /spaces/{id}:
 *  put:
 *    summary: Obtiene los datos de un espacio por id
 *    tags: [Spaces]
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
 *            $ref: '#/components/schemas/Spaces'
 *    responses:
 *      200:
 *        description: Solicitud exitosa
 *      405:
 *        description: El campo no existe
 */
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

/**
 * @swagger
 * /spaces/:
 *   post:
 *     summary: Crea un nuevo espacio
 *     tags: [Spaces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Spaces'
 *     responses:
 *       200:
 *         description: El campo se creó exitosamente
 *       405:
 *         description: El espacio no se pudo crear
 */
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

/**
 * @swagger
 * /spaces/{id}:
 *  put:
 *    summary: Actualizar una reservación
 *    tags: [Spaces]
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
 *            $ref: '#/components/schemas/Spaces'
 *    responses:
 *      200:
 *        description: La actualización fue exitosa
 *      405:
 *        description: Ocurrió un error y no se pudo actualizar
 */
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


/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Eliminar una reservación por id del campo
 *     tags: [Spaces]
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
 *         description: El espacio fue eliminado
 *       404:
 *         description: El espacio no existe
 *       402:
 *         description: Parámetros incompletos
 */
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        spaces.forEach( (space, i) => { 
            if (space.id == id) {
                spaces.splice(i, 1);
                res.status(200).json({OK: 'Ok space deleted!'});
            }
            
        });
        res.status(404).json({Error: 'There was an error. This space not exist'});
    }res.status(402).json({Error: 'Please insert an id on url'});
});

router.all('/', (req, res) => {
    res.status(504).json({Error: 'Please try with another method'});
});
router.all('/*', (req, res) => {
    res.status(504).json({Error: 'Please try with another url'});
});

exports.spaces= spaces;
module.exports = router;
