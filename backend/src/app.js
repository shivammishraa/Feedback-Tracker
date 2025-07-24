const express = require('express');
const app =express();
const feedbackRoute = require('./router/feedback.router') 
const AuthRoute = require('./router/auth.router') 
const bodyparse = require('body-parser')
const cors = require("cors")
/* application middleware */
app.use(bodyparse.json())
app.use(cors())
/* application route */
app.use('/feedback',feedbackRoute)
app.use('/auth',AuthRoute)

app.listen(4000,()=>{
    console.log("express application working");
    
})