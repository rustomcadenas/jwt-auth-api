const express = require('express');
const cors = require('cors');
const apiRoute = require('./routes/api.routes.js'); 

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;
 
app.use(express.static(__dirname+'/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
 
require('./routes/app.routes.js')(app);
app.use('/api/users', apiRoute);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});