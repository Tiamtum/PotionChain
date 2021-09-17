const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const indexRoutes = require("./routes/index");
const {ExpressError} = require("./utils/ExpressError");
const session = require("express-session");

app = express();
const port = 3000;
const dbUrl = "mongodb://localhost:27017/PotionChain"

mongoose.connect(dbUrl,
    // {   useNewUrlParser:true, 
    //     useUnifiedTopology:true,
    //     useFindAndModify:false,
    //     useCreateIndex: true
    // }
    )
    .then(()=>{
        console.log(`[Mongoose | SUCCESS] - Connection Open @ ${dbUrl}`);
    })
    .catch((e)=>{
        console.log(`[Mongoose | ERROR] - ${e}`);
    })

app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate)
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));


const sessionConfig={
    secret: "eGxgVdJvzxNLkRpkJGj1",
    resave: false,
    name:"session",
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 1000*60*60*24*7,  //today's date in ms + 1 week in ms
        maxAge: 1000*60*60*24*7,
        httpOnly: true,  //https://owasp.org/www-community/HttpOnly
        sameSite: true
        //secure: true //this cookie will only work over https
    },
}
app.use(session(sessionConfig));

//allows for ejs pass through
// app.use((req,res,next)=>{
//         console.log(req.session);
//         req.locals.data = req.session;
//         next();
// })

app.use("/",indexRoutes);

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page Not Found",404));
})

app.use((err,req,res,next)=>{  //generic errors
    const {statusCode=500} = err;
    if(!err.message) err.message = "[ERROR] An error occured.";
    res.status(statusCode).render("error",{pageTitle:"Error",error: err,statusCode});
})

app.listen(port,()=>{
    console.log(`Listening on localhost:${port}`);
})