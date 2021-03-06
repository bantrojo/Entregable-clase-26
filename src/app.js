const express = require('express');
const session=require('express-sessions')
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const jwt=require('jsonwebtoken');
const app = express();

//const ProductManager=require('./Manager/productManager.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use(cookieParser());

const faker = require('faker');
const res = require('express/lib/response');

const { name, internet, } = faker;


app.use('/api/products-faker', function (req, res) {
    let objects = [];
    for (let i = 0; i < 5; i++) {
        objects.push({
            product: commerce.product(),
            name: commerce.productName(),
            price: commerce.price(),
            thumbnail: image.image()

        })
    }
    res.send(objects)
})

//crear sesion
app.use(session({
    store:mongoStore.create({
        mongoUrl:"mongodb+srv://Bantrojo:<password>@codercluster18335.vh3wc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        ttl:30
    }),
    secret:"claveSecreta",
    resave:false,
    saveUnitialized:false,
    cookie:{
        secure:false,
        maxAge:30000
    }
}))

app.get('/login',(req,res)=>{
    res.send(`
    <html>
        <head>
            <title>Login</title>
        </head>    
        <body>
            <form method="POST" action="/auth">
                Nombre de usuario: <input type="text" name="text">
                Contraseña: <input type="password" name="password">
                <input type="submit" value="Iniciar sesion">
            </form>
        </body>
    
    `)
})

app.post('/auth',(req,res)=>{
    const {username,password}=req.body;
    const user={username:username};

    const accessToken=generateAccessToken(user);
});
function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET,{expiresIn:'5m'})
}res.header('autorization',accessToken).json({
    message:'autenticacion realizada',
    token:token
})
function validateToken(req,res, next){
    
}


app.post('/profile',(req,res)=>{
    if(req.session.user){
       res.json(req.session)
    }else{
        res.status(403).send("unauthorized")
    }
    
})

app.post("/logout",(req,res)=>{
   
    res.send("sesion cerrada")
})



admin = false;


const PORT = 8080;
const server = app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`))
