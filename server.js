const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root', // change if necessary
    database : 'face-recognition'
  }
});



const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send(database.users);
})

//for signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
	console.log("running okay! on port 3000");
});



/*
/ --> res = this is working
/signin --> POST = success/failure
/register --> POST = user object
/profile/:userId --> GET = user
/image --> PUT --> user updated
*/