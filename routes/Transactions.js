const express = require('express')
const Transaction = require('../model/Transaction')

const router = express.Router()

const crypto = require('crypto');

const base = 'BNBUSDT'
var nowdate = new Date();
var timestamp = nowdate.getTime(); 

const query_string = `timestamp=${timestamp}`;
const apiSecret = '69d8IPfJ9Dq3FaOv5NAfAAeAAHPV0xK7';

const signature = crypto
.createHmac('sha256', apiSecret)
.update(query_string)
.digest('hex')


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
        const response = await fetch(`https://api.binance.com/api/v3/order?symbol=${base}&recvWindow=5000&timestamp=${timestamp}&signature=${signature}`)
        .then((response) => response.json())
        .then((data) => console.log(data));
        // console.log(response);

        return response
    }catch(err){
        console.log(err);
    }
})

module.exports = router