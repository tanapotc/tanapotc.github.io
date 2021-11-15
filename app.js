var express = require('express')
var server = express()
var ejs    = require('ejs')
server.engine('html',ejs.renderFile)
server.listen(3000)
server.get('/',showHome)
function showHome(req, res) {
    res.render('home.html')
}
