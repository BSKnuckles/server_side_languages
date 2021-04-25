'use strict'

const host = '0.0.0.0'
const port = 8080

const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

let express = require('express')
let request = require('request')
let bodyParser = require('body-parser')

let ejs = require('ejs')
const router = express.Router()
let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

router.get('/', function (req, res) {
	res.render('index', { pagename: 'home' }) // /views/index.ejs
})

router.get('/about', function (req, res) {
	res.render('about', { pagename: 'about' }) // /views/about.ejs
})

router.get('/register', function (req, res) {
	res.render('register', { pagename: 'register' })
})

router.post('/register', function (req, res) {
	let errors = []

	if (req.body.firstname == '') {
		errors.push('First name is a required field')
	}
	if (req.body.lastname == '') {
		errors.push('Last name is a required field')
	}
	if (req.body.address == '') {
		errors.push('Address is a required field')
	}
	if (req.body.city == '') {
		errors.push('City is a required field')
	}
	if (req.body.state == '') {
		errors.push('State is a required field')
	}
	if (req.body.zip == '') {
		errors.push('Zip is a required field')
	}
	if (req.body.bio == '') {
		errors.push('Bio cannot be empty')
	}
	if (typeof req.body.age == 'undefined') {
		errors.push('Age is a required field')
	}
	if (typeof req.body.gender == 'undefined') {
		errors.push('Gender is a required field')
	}
	if (typeof req.body.consent == 'undefined') {
		errors.push('You must agree to the terms and conditions')
	}

	if (errors.length > 0) {
		res.render('register', { pagename: 'register', errors: errors })
	} else {
		res.render('index', {
			pagename: 'home',
			success: 'Registration completed successfully!',
		})
	}
})

router.post('/login', function (req, res) {
	console.log(req.body)
	let errors = []

	// Error checks
	if (req.body.email == '') {
		errors.push('Email is a required field.')
	}
	if (req.body.password == '') {
		errors.push('Password is a required field.')
	}
	if (
		!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			req.body.email,
		)
	) {
		errors.push('Email is not in a valid format.')
	}
	if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password)) {
		errors.push(
			'Password is invalid. Requires at least 8 characters, one letter and one number.',
		)
	}

	console.log(errors)

	res.render('index', { pagename: 'home', errors: errors })

	// res.redirect('/')
})

app.use(express.static('public'))
app.use('/', router)
let server = app.listen(port)
