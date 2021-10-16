const express = require("express");
const router = express.Router();
const pg = require(`pg`);

const Pool = pg.Pool;

const pool = new Pool({
    database: `tasks`,
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on(`connect`, () => {
    console.log("postgreSql connected");
});
pool.on(`error`, (error) => {
    console.log("ERROR connecting to postgreSQL", error);
});


//GET
router.get(`/`, (req, res) => {
    console.log(`Continuing to get tasks`);

    let queryText = `
    SELECT * FROM "tasks"
    ORDER BY "id";`;

    pool.query(queryText)
        .then((result) => {
            console.log(result);
            res.send(result)
        })
        .catch((err) => {
            console.log(`Error getting tasks:`, err);
            res.sendStatus(501);
        });
})


//PUT
router.put("/:id", (req, res) => {
    console.log(``);
}


//POST



//DELETE



module.exports = router;