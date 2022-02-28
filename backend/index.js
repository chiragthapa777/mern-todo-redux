const express= require('express');
const app = express();
const mongoose= require("mongoose");
const cors = require("cors")
const todos= require("./routes/todos")
const signUp= require("./routes/signUp")
const signIn= require("./routes/signIn")


const { Todo }=require("./models/todo");

//using middlewares
app.use(cors());
app.use(express.json());

app.use("/api/todos",todos)
app.use("/api/signup",signUp)
app.use("/api/signin",signIn)


require("dotenv").config();
const connection_string= process.env.CONNECTION_STRING;
const port=process.env.PORT || 3000

mongoose.connect(connection_string,{
    //in mongo 6 they are default
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true
})
.then(()=>{
    console.log("mongoDB connection established");
})
.catch((error)=>{
    console.error("mongoDB connection failed:",error.message);
})

app.get('/',(req,res)=>{
    res.send('welcome to our todos api');
})


app.listen(port, ()=>{
    console.log(`server running on port ${port}....`);
});


