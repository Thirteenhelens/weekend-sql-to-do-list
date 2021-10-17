//Setting up express
const express = require('express');
const router = express.Router();

//Setting up postgres
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log(`postgreSQL connected`);
});
pool.on('error', (error) => {
    console.log(`ERROR connecting to postgreSQL`, error);
});


//GET
router.get('/', (req, res) => {
    console.log(`Getting tasks`);

    let queryText = `
    SELECT * FROM "tasks"
    ORDER BY "id";`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log(`Error getting tasks:`, err);
            res.sendStatus(500);
        });
})


//POST
router.post('/', (req, res) => {
    const newTask = req.body;

    console.log(req.body);

    let queryText = `
    INSERT INTO "tasks" ("task", "isComplete")
    VALUES ($1, false);
    `;

    console.log(`Query ->`, queryText);

    pool.query(queryText, [newTask.task])
        .then((result) => {
            console.log(`Result ->`, result);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error posting:`, err);
            res.sendStatus(500);
        })
});


// PUT
router.put('/:id', (req, res) => {
    console.log(`Completing task`);

    let id = req.params.id;
    let value = [id];

    let queryText = `
    UPDATE "tasks"
    SET "isComplete" = TRUE
    WHERE "id" = $1;
    `;

    console.log(`Query ->`, queryText);

    pool.query(queryText, value)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(`Error completing task`, err);
            res.sendStatus(500);
        })
});


//DELETE
router.delete('/:id', (req, res) => {
    console.log(`Deleting Task`);

    let id = req.params.id;
    console.log(id);

    let value = [id];

    let queryText = `
    DELETE FROM "tasks"
    WHERE "id" = $1;
    `;

    pool.query(queryText, value)
        .then(result => {
            res.sendStatus(202);
        })
        .catch(result => {
            console.log(`Error deleting`, err);
            res.sendStatus(500);
        })
});


module.exports = router;