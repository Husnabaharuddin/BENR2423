const MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');
const express = require('express')

const User = require('./user');

require('dotenv').config()
const mongoPath = process.env.MONGOPATH

MongoClient.connect(
	// TODO: Connection 
	mongoPath,
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.get('/hello', (req, res) => {
	res.send('Hello BENR2423')
})

app.post('/login', bodyParser.json(), async (req, res) => {
	console.log(req.body)
	//const user = await User.login(req.body.username, req.body.password);

	//res.send('Ok')
	res.json({
		_id: '123456',
		name: 'test',
		age: 18,
	})
})

app.post('/register', async (req, res) => {
	//console.log(req.body);
	res.json(req.body)
	// res.json({
	// 	_id: '123456',
	// 	name: 'test',
	// 	age: 18,
	// })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
