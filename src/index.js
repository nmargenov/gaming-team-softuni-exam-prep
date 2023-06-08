const express = require('express');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const connectDatabase = require('./config/databaseConfig');

const router = require('./routes');
const { PORT } = require('./config/config');

const app = express();

expressConfig(app);
handlebarsConfig(app);

connectDatabase()
    .then(()=>console.log('Database is successfully connected!'))
    .catch(err =>{console.log('Error connecting to the database: ',err)});

app.use(router);

app.listen(PORT,()=>console.log(`Server is listening on port ${PORT}...`));