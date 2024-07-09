//------------- packages import-----------

var express=require('express');
var multer=require('multer');
var cookieParser = require('cookie-parser');
var session = require ('express-session')

//---------------- models-----------

var signup = require('../model/signup');
var addbook = require('../model/addbook');
var contact = require('../model/contact');


// data from database on user interface

var router=express.Router();
router.get ('/' , async function (req,res){
    const showdata = await addbook.find({})
    console.log(showdata)
    res.render('index', {data_index : showdata});
        
})

router.get ('/collection' , async function (req,res){
    const showdata = await addbook.find({})
    console.log(showdata)
    res.render('collection', {data_index : showdata});
        
})


//---------------- user interface-----------

router.get('/aboutus' , function (req,res){
    res.render('aboutus');
})

router.get('/collection' , function (req,res){
    res.render('collection');
})

router.get('/contact' , function (req,res){
    res.render('contact');
})

router.get('/login' , function (req,res){
    res.render('login');
})

router.get('/register' , function (req,res){
    res.render('register');
})


//---------------- dashboard-----------

router.get('/dashboard' , function(req,res){
    if(req.session.user && req.cookies.user_sid){
    res.render('dashboard/index');
}  

else { res.redirect('/login');}

});



router.get('/addbook' , function(req,res){
    if(req.session.user && req.cookies.user_sid){
    res.render('dashboard/addbook');
    }
    else { res.redirect('/login');}
})


router.get('/logout', (req,res)=> {
    if (req.session.user && req.cookies.user_sid){
        res.clearCookie("user_sid");
        res.redirect("/login");
    } else {
        res.redirect("/login");
    }
})




//-------------------------------------------------
//------------------ signup api-------------------
//--------------------------------------------------


router.post('/signup', (req,res)=>{
    var reg={
        username: req.body.username,
        email : req.body.email,
        number: req.body.number,
        password : req.body.password,
        confirmpassword: req.body.confirmpassword,

    }

var reg1 = new signup(reg);
reg1.save()

.then(()=>
res.json ('register uccessfully'))

.catch (err=> res.status(400).json('error:'+ err));

console.log("connection successfully")

        
});


router.get('/viewsignup' , async function(req,res){
    var reg= await signup.find({})
    console.log(reg)
    if(req.session.user && req.cookies.user_sid){
    res.render('dashboard/viewsignup', {data:reg});
    }
    
    else { res.redirect('/login');}

    });



router.get("/delete/:id", async (req, res) => {
    try{
        const signupdata= await signup.findByIdAndDelete(req.params.id);
    
    res.redirect('/viewsignup');
    } catch (err) { 
        console.log(err);
    }
});


router.get("/edit/:id", async (req, res) => {
    try{
        const signupdata= await signup.findById(req.params.id);
    
        
    res.render('dashboard/edit-register',{editsignup:signupdata});
    } catch (err) { 
        console.log(err);
    }

});


router.post('/edit/:id', async (req,res) => {
    const updatesignup = {
        username: req.body.username,
        email : req.body.email,
        number: req.body.number,
    }

    try{
        const updateitem = await signup.findByIdAndUpdate(req.params.id, updatesignup);

        if (!updateitem) { return res.status (404).json({ message: 'Item not found'});
        }
        res.redirect ('/viewsignup');
    }
    catch (err){
        res.status(500).json({ message: 'Server Error'});
    }
});






//-------------------------------------------------
//------------------ addbook api-------------------
//--------------------------------------------------


//------------- fileuploadapi-------------------

const storage= multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './upload');
    },

    filename: function (req, file, cb){
        cb(null, file.originalname);
    }

})

    const fileFilter = (req, file, cb) => {
        const allowedFileTypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else{
            cb(null, false);
        }
    }

    let upload = multer({storage, fileFilter}); 

//------------- fileuploadapi ends-------------------


router.post('/addbook', upload.single('fileupload'), (req,res)=> {
    var add={
        bookname: req.body.bookname,
        authorname : req.body.authorname,
        bookprice: req.body.bookprice,
        discount : req.body.discount,
        offer: req.body.offer,
        details: req.body.details,
        fileupload: req.file.filename

    }

var add1 = new addbook(add);
add1.save()

.then(()=>
res.json('register uccessfully'))
.catch (err=> res.status(400).json('error:'+ err));

console.log("connection successfully")
        

        
});


router.get('/viewbook' ,async function(req,res){
    var reg= await addbook.find({})
   console.log(reg);
   if(req.session.user && req.cookies.user_sid){
   res.render('dashboard/viewbook', {book:reg});
   }

   else { res.redirect('/login');}
   
}); 


router.get("/delete_2/:id", async (req, res) => {
    try{
        const bookdata= await addbook.findByIdAndDelete(req.params.id);
    
    res.redirect('/viewbook');
    } catch (err) {
        console.log(err);
    }
});

router.get("/edit_2/:id", async (req, res) => {
    try{
        const bookdata= await addbook.findById(req.params.id);
    
        
    res.render('dashboard/edit-book',{editbook:bookdata});
    } catch (err) { 
        console.log(err);
    }

});

router.post('/edit_2/:id', async (req,res) => {
    const updatebook = {
        bookname: req.body.bookname,
        authorname : req.body.authorname,
        bookprice: req.body.bookprice,
        discount : req.body.discount,
        offer: req.body.offer,
        details: req.body.details,

    }

    try{
        const updateitem = await addbook.findByIdAndUpdate(req.params.id, updatebook);

        if (!updateitem) { return res.status (404).json({ message: 'Item not found'});
        }
        res.redirect ('/viewbook');
    }
    catch (err){
        res.status(500).json({ message: 'Server Error'});
    }
});


//-------------------------------------------------
//------------------ contact api-------------------
//--------------------------------------------------



router.post('/contact', (req,res)=>{
    var cont={
        name: req.body.name,
        email : req.body.email,
        mobile: req.body.mobile,
        address : req.body.address,
        comments: req.body.comments,

    }

var cont1 = new contact(cont);
cont1.save()

.then(()=>
res.json ('register uccessfully'))

.catch (err=> res.status(400).json('error:'+ err));

console.log("connection successfully")
        

        
});


router.get('/viewcontact' ,async function(req,res){
    var reg= await contact.find({})
    console.log(reg)
    if(req.session.user && req.cookies.user_sid){
    res.render('dashboard/viewcontact', {contact:reg});
    }
    else { res.redirect('/login');}
});

router.get("/delete_3/:id", async (req, res) => {
    try{
        const contactdata= await contact.findByIdAndRemove (req.params.id);
    
    res.redirect('/viewcontact');
    } catch (err) {
        console.log(err);
    }
});


router.get("/edit_3/:id", async (req, res) => {
    try{
        const contactdata= await contact.findById(req.params.id);
    
        
    res.render('dashboard/edit-contact',{editcontact:contactdata});
    } catch (err) { 
        console.log(err);
    }

});


router.post('/edit_3/:id', async (req,res) => {
    const updatecontact = {
        name: req.body.name,
        email : req.body.email,
        mobile: req.body.mobile,
        address : req.body.address,
        comments: req.body.comments,

    }

    try{
        const updateitem = await contact.findByIdAndUpdate(req.params.id, updatecontact);

        if (!updateitem) { return res.status (404).json({ message: 'Item not found'});
        }
        res.redirect ('/viewcontact');
    }
    catch (err){
        res.status(500).json({ message: 'Server Error'});
    }
});



//-------------------------------------------------
//------------------ bookdetails api-------------------
//--------------------------------------------------


router.get("/bookdetails/:id", async (req, res) => {
    try{
        const bookdetails= await addbook.findById(req.params.id);
    
        
    res.render('bookdetails',{bookdata: bookdetails});
    } catch (err) { 
        console.log(err);
    }

});



//-------------------------------------------------
//------------------ login api-------------------
//--------------------------------------------------



router.post('/login', async (req,res)=>{
    var email = req.body.email,
        password = req.body.password;

        try{
            var user = await signup.findOne({ email: email})
            .exec();
            if (!user){
                res.redirect("/login");
            }
        
        
            user.comparePassword(password, (error, match)=> {
                if(!match){
                    res.redirect('/login');
                }
            });

            req.session.user = user;
        
        res.redirect("/dashboard");
    }
        catch (error){
        console.log(error)
    }
});










module.exports=router;

