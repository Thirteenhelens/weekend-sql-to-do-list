//Express 
const express = require('express');
const app = express();
app.use(express.static('server/public'));

//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Adding the routes file
const taskRouter = require('./routes/task.router.js');

// ROUTE
app.use('/tasks', taskRouter);

// Start listening for requests on a specific port
const PORT = 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});