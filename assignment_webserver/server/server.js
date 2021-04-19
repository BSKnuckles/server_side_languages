const fs = require('fs');
const http = require('http');
const path = require('path');

const host = '0.0.0.0'
const port = 8080
const client = '../client'

http.createServer(function (req, res) {

    let pathName = path.parse(req.url).name
    let content = client + req.url
    let ext = path.extname(content)

    fs.readFile(content, function (err, data) {
        if (err) {
            res.writeHead(500)
            res.destroy(err)
        } else {
            res.writeHead(200) // header()
            if (ext == '.html') {
                res.write(
                    `<script>const routes = ['index', 'about', 'products', 'store']; const activePage = "${pathName}";</script>`)
            }
            res.end(data)
        }
    })
}).listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})