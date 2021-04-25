var http = require('http')
var myname = function () {
	return 'Here is my IP address'
}

function callHttpbin() {
	let promise = new Promise((resolve, reject) => {
		http.get('http://httpbin.org/ip', function (response) {
			var str = ''
			response.setEncoding('utf8')
			response.on('data', function (data) {
				str += data
			})
			response.on('end', function () {
				var result = JSON.parse(str)
				let myips = result.origin
				resolve(myips)
			})
		})
	})

	return promise
}

async function executeAsyncTask() {
	const valueA = await callHttpbin()
	const valueB = myname()
	console.log(valueB + ' ' + valueA)
}

executeAsyncTask()
