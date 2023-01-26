const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {

        sellingCoin:{type:String},
        bankName:{type:String},
        accountNumber:{type:String},
        mobileMoney:{type:String},
        mobileReference:{type:String},
        mobileNumber:{type:String},
        amounttosend:{type:String},
    
    },
    {timestamps:true}
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;