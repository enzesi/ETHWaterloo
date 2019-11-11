const port = 8008;
const express = require('express') 
const app = express();
const ejs = require('ejs')
const path = require('path')
require('dotenv').config();
const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
  


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

const privateKey = process.env.PRIVATE_KEY
const providerUrl = process.env.PROVIDER
const sender = process.env.ADDR

const provider = new HDWalletProvider(privateKey, providerUrl)
const instance = new Web3(provider)
const ropstenGasprice = 51000000000



app.get('/', function(req, res) {
  res.render('entry')
})

app.get('/about', function(req, res) {
  res.render('about')
})

app.get('/demo', function(req, res) {
  res.render('demo')
})

app.post('/startSending', async function(req, res) {
  let account = req.body.account
  console.log('receiver: ', account, )
  instance.eth.sendTransaction({
    from: sender, 
    to: account,
    value: '1000000000000000',
    gasPrice: ropstenGasprice,
    gas:2100000,
  })
  .on('transactionHash', function(hash){
    console.log('hash: ', hash)
  })
  .on('receipt', function(receipt){
    console.log('receipt: ', receipt)
  })
  .on('confirmation', function(confirmationNumber, receipt){ 
    console.log('confirm and receipt: ', confirmationNumber, receipt)
    res.status(200).json({msg: 'success' }).end()
   })
  .on('error', function() {
    res.status(400).json({msg: 'fail' }).end()
  });
})


app.listen(port, () => { 
  console.log('ok on ' + port)
});

