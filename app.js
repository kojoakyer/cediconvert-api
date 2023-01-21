const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')


const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;




const db = process.env.MONGO_URL
mongoose.connect(db)
.then(()=>{console.log('mongodb is connected')})
.catch((err)=>{console.log(err);})

app.use(express.json());



app.listen(PORT, function(){
    console.log(`server is running on ${PORT}`);
})
