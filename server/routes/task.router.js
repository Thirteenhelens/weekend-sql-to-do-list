const express = require("express");
const router = express.Router();
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
    console.log("postgreSQL connected");
});
pool.on('error', (error) => {
    console.log("ERROR connecting to postgreSQL", error);
});


//GET
router.get('/', (req, res) => {
    console.log('Getting tasks');

    let queryText = `
    SELECT * FROM "tasks"
    ORDER BY "id";`;

    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((err) => {
            console.log('Error getting tasks:', err);
            res.sendStatus(501);
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

    console.log('Query ->', queryText);

    pool.query(queryText, [newTask.task])
        .then((result) => {
            console.log('Result ->', result);
            res.sendStatus(202);
        })
        .catch((err) => {
            console.log('Error posting:', err);
            res.sendStatus(500);
        })
});


// PUT
// router.put('/:id', (req, res) => {
//     console.log(`Completing task`);

//     let queryText = `
//     UPDATE "koalas"
//     SET "transfer_ready" = TRUE
//     WHERE "id" = $1
//     `;
// });



//DELETE



module.exports = router;