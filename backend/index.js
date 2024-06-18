const express = require("express");
const rootRouter = require("./routes/index");
const cors = require('cors')
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT
dotenv.config()


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

//using Cors
app.use(cors())
//Body parser
app.use(express.json())



app.use("/api/v1", rootRouter);

