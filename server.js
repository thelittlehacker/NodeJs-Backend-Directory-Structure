const express = require('./src/config/express');
const config = require('./src/config/env/config');
const connectDB = require('./src/config/database/dbConnection')
const app = express();
connectDB();
const PORT = config.port ? config.port : process.env.PORT



app.listen(process.env.PORT || config.port, function () {
    console.log('----------------------------------------------------------');
    console.log('Server listening at port : ' + PORT);
    console.log('Time : ' + new Date());
    console.log('----------------------------------------------------------');
});