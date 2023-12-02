const mongoose=require('mongoose');

const EMPSchema=mongoose.Schema({
    name:String,
    position:String,
    location:String,
    salary:Number
});

const EMPdata=mongoose.model('Employee',EMPSchema);
module.exports=EMPdata;