require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoute = require('./Route/adminRoute');
const doctorRoute = require('./Route/doctorRoute');
const cors = require('cors');
const patientRoute = require('./Route/patientRoute');
const appRoute = require('./Route/appRoute');
const newsRoute = require('./Route/newsRoute');
const feedRoute = require('./Route/feedRout');


const app = express();
const port = 8000;
const dbUrl = process.env.ATLASDB_SECRET;
;

mongoose.connect(dbUrl)
.then(()=>console.log("Mongodb Connected Success"))
.catch((err)=>console.log(`Error : ${err}`));

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://healthnexus-frontend-1.onrender.com" 
    ],
    credentials: true
}));
app.use('/api/admin',adminRoute);
app.use('/api/doctor',doctorRoute);
app.use('/api/patient',patientRoute);
app.use('/api/app',appRoute);
app.use('/api/news',newsRoute);
app.use('/api/feed',feedRoute);

app.listen(port,()=>console.log(`Server Running on Port : ${port} `));