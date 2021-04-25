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
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
)
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express)

const session = require('express-session')
app.use(
	session({
		secret: 'secret',
		saveUninitialized: true,
		resave: true,
	}),
)
let sess

router.get('/', function (req, res) {
	sess = req.session
	res.render('index', {
		pagename: 'home',
		sess: sess,
	}) // /views/index.ejs
})

router.get('/about', function (req, res) {
	sess = req.session
	res.render('about', {
		pagename: 'about',
		sess: sess,
	}) // /views/about.ejs
})

router.get('/profile', function (req, res) {
	sess = req.session
	if (typeof (sess) == 'undefined' || sess.loggedin != true) {
		let errors = ['Not an authenticated user']
		res.render('index', {
			pagename: 'home',
			errors: errors,
		})
	} else {
		res.render('profile', {
			pagename: 'profile',
			sess: sess,
		})
	}
})

router.get('/logout', function (req, res) {
	sess = req.session
	sess.destroy(function (err) {
		res.redirect('/')
	})
})

router.post('/login', function (req, res) {
	sess = req.session
	let errors = []

	// Form validation checks
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
	if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(req.body.password)) {
		errors.push(
			'Password is invalid. Requires at least 8 characters, one letter and one number.',
		)
	}

	// Redirect to index with errors in form validation fails
	if (errors.length > 0) {
		res.render('index', {
			pagename: 'home',
			errors: errors,
		})
	} else {
		if (req.body.email != 'mike@aol.com' && req.body.password != 'abc123') {
			sess.loggedin = false
			res.render('index', {
				pagename: 'home',
				errors: ['Invalid credentials.'],
			})
		} else {
			sess.loggedin = true
			res.render('profile', {
				pagename: 'profile',
				sess: sess,
			})
		}
	}
})

app.use(express.static('public'))
app.use('/', router)
let server = app.listen(port)
