const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    name:{ type: String, required: true},
    email:{ type: String,  required: true},
    mobile :{ type: Number, unique:true, required: true },
    address:{ type: String,  required: true },
    comments:{ type: String,  required: true },
})



 
const contactModel=mongoose.model('contact', contactSchema)


module.exports=contactModel;