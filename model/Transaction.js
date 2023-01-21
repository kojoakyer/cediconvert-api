const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        sellingCoin:{type:String, required:true, unique:true},
        bankName:{type:String, required:true},
        accountNumber:{type:String, required:true},
        categories:{type:Array},
        size:{type:Array},
        color:{type:Array},
        price:{type:String, required:true},
        inStock:{type:Boolean, default:true},
    },
    {timestamps:true}
)

const Transaction = mongoose.model('Cart', transactionSchema);

module.exports = Cart;