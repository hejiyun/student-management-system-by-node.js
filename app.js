var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

app.use('/public/',express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)



app.listen(5034,function () {
    console.log('running...')
})