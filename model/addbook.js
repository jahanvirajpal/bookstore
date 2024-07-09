const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    bookname: {type: String, required: true  },
    authorname: {type: String, required: true  },
    bookprice: {type: Number, required: true  },
    discount: {type: Number, required: true  },
    offer: {type: String, required: true  },
    details: {type: String, required: true  },
    fileupload: {type: String, required: true  },
    

});


const bookModel=mongoose.model('addbook', bookSchema)


module.exports=bookModel;
