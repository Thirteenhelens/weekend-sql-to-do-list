const express = require("express");
const app = express();
//Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 5000;
const taskRouter = require('./routes/task.router.js');
// ROUTE
app.use('/tasks', taskRouter);
// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log("listening on port", PORT);
});


app.use(express.static('server/public'));