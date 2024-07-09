const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    username:{ type: String, required: true},
    email:{ type: String,  required: true},
    number:{ type: Number, unique:true, required: true },
    password:{ type: String, unique:true, required: true },
    confirmpassword:{ type: String, unique:true, required: true },
})

userSchema.pre("save", function (next){
    if (!this.isModified("password")) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


userSchema.methods.comparePassword = function (plaintext , callback) {
    return callback (null, bcrypt.compareSync(plaintext , this.password))
};



 
const userModel=mongoose.model('signup', userSchema)


module.exports=userModel;






