const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotEnv = require('dotenv');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const servicePRouter = require('./routes/servicePRoutes');
const cors = require('cors');
const connectDb = require('./config/db');

//config dotenv
dotEnv.config();
const app = express();
app.use(cors());

//database connection
connectDb();

app.use(express.json());
app.use(morgan('dev'));

//router for user
app.use('/api',userRouter);
//router for admin
app.use('/api/admin',adminRouter);
app.use('/api/serviceP',servicePRouter);

app.get('/',(req,res) => {
    res.send('Hii i am backend , i am running');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`Server running in ${process.env.NODE_MODE} on port`.bgCyan.blue);
})