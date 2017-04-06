
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const UserRepository = require('./user-repository')
const EventAdapter = require('./event-adapter')
const UserService = require('./user-service')

app.use( bodyParser.json() ); 

app.post('registerUser', async (req, res) => {
    const userService = new UserService(new UserRepository(), new EventAdapter());
    const userData = req.body; // Using bordy-parser
    const result = await userService.registerUser(userData);

    res.send(result);
});

app.post('confirmUser', (req, res) => {
    const userService = new UserService(new UserRepository(), new EventAdapter());
    const userData = req.body; // Using bordy-parser
    const result = await userService.confirmUser(userData);

    res.send(result);
});

app.listen(3000, () => {
    console.log('Listening to port 3000');
});