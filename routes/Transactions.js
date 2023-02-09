const express = require('express')
const Transaction = require('../model/Transaction')

const router = express.Router()
const dotenv = require('dotenv')
const crypto = require('crypto');
const { Spot } = require('@binance/connector')

dotenv.config();

const base = 'BNBUSDT'
// var nowdate = new Date();

// var apiSecret = process.env.SECRET_KEY

const apiKey = process.env.API_KEY
const apiSecret = process.env.SECRET_KEY
const client = new Spot(apiKey, apiSecret)



// const getParameters = async ()=>{
//    const response = await  fetch('https://api.binance.com/api/v3/time',{
//     headers:{
//         "X-MBX-APIKEY":process.env.API_KEY
//     }
// })
//     const {serverTime}= await response.json()
//     const query_string = `timestamp=${serverTime}`;
//     const signature = crypto
//     .createHmac('sha256', apiSecret)
//     .update(query_string)
//     .digest('hex')

//     console.log(serverTime);
//     console.log(signature);

//     return {serverTime,signature}
    
// }









router.post('/', async function(req,res){
    const newTransaction = new Transaction(req.body)

    try{
        const savedTransaction = await newTransaction.save()
        res.status(200).json(savedTransaction)
    }catch (err){
        res.status(403).json(err)
    }
})

router.get('/', async function(req, res){
    try{
        const transactions = await Transaction.find();

        res.status(200).json(transactions)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id', async function(req,res){
    try{
        const transaction = await Transaction.findById(req.params.id)
        res.status(200).json(transaction)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/binance/trade', async function(req,res){
    try{
        // const {serverTime,signature}= await getParameters()
        
        // const response = await fetch(`https://api.binance.com/api/v3/order?symbol=${base}&timestamp=${serverTime}&signature=${signature}`,{
        //     headers:{
        //         "X-MBX-APIKEY":process.env.API_KEY,
        //         "signature":signature
        //     }
        // })
        // .then((response) => response.json())
        // .then((data) => console.log(data));
        // // console.log(response);
        // res.status(200).json(response)
//         client.trades('BTCUSDT', { limit: 5 }).then(response => client.logger.log(response.data))
//         .then((data)=>console.log(data))
//   .catch(error => client.logger.error(error))
// client.tickerPrice().then(response => client.logger.log(response.data))
// .then((data)=>console.log(data))

// client.tickerPrice('BTCUSDT').then(response => client.logger.log(response.data))
// .then((data)=>console.log(data))

client.tickerPrice('', ['BTCUSDT', 'BNBUSDT']).then(response => client.logger.log(response.data))
.then((data)=>console.log(data))
    }catch(err){
        console.log(err);
    }
})

module.exports = router