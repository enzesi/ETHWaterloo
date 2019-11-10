const port = 8008;
const express = require('express') 
const app = express();
const ejs = require('ejs')
const path = require('path')


app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('client'))
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/img',express.static(path.join(__dirname, 'public/img')))
app.use('/js',express.static(path.join(__dirname, 'public/js')))
app.use('/css',express.static(path.join(__dirname, 'public/css')))

app.get('/', function(req, res) {
  res.render('entry')
})

app.get('/about', function(req, res) {
  res.render('about')
})

app.get('/demo', function(req, res) {
  res.render('demo')
})


app.listen(port, () => { 
  console.log('ok on ' + port)
});

