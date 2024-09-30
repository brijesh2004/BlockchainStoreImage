const express = require("express");
const app = express();
const cors = require("cors");
const {MONGODB_URL ,PORT} = require("./config/serverConfig");
const {connectDB} = require("./db/connect");
const authenticationRoutes = require("./routes/authenticationRoutes");
const uploadImageRoutes = require("./routes/uploadImageRoutes");
const getImageRoute = require("./routes/getImageRoute");
app.use(express.json());


app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','DELETE','UPDATE','OPTIONS'],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization' , 'x-access-token']
}));

app.use("/api" ,authenticationRoutes);
app.use("/api" ,uploadImageRoutes);
app.use("/api" ,getImageRoute);

async function  serverStart() {
    try{
        await connectDB(MONGODB_URL);
        console.log("DB Connected");
       app.listen(PORT , ()=>{
           console.log(`Server is Listening on the ${PORT}`)
       })
    }
    catch(err){
        console.log(err);
    }
}

serverStart();
