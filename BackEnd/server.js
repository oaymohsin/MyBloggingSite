//Block Start Dependencies
const express = require('express');
const cors = require('cors')
// require("dotenv/config");
const ApplicationConfiguration = require('./configuration/ApplicationConfiguration')
const ResponseofMyDataBase = require('./configuration/DataBaseConfiguration')
//Block End Dependencies

//Block Start Initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(express.raw())
app.use(cors())
app.use('/assets', express.static('assets')); //Static file configuration in Express.js: If you are using Express.js, serving static files is typically done using the express.static middleware.
const PORT = process.env.PORT || 1234;
//Block End Initialize the app

//Start Block Setting th Headers for your Application
app.all('*', (req, res, next) => {
    // This is how we protect the api
    res.header('Access-Control-Allow-Origin', '*');// So it make the header allow to the origin when cross platfrom try to exchange the data
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        //Mehtod is a property which help us to use the Methods by request. Browers send the options request before your Mthods request
    }
    next(); //if nothing of the response sent back so next() means other rou
});
//End Block Setting the Header for your Application

//Start Block accessing the routes in the entry point
const _UserManagementRoute = require('./routes/UserManagementRoute')
const _ProductManagementRoute = require('./routes/DataManagementRoutes')
//Start Block accessing the routes in the entry point

//Using Routes
app.use('/userManagement', _UserManagementRoute)
app.use('/productManagement', _ProductManagementRoute)
//Using Routes

//Start Block for listening your app on defined port
app.listen(PORT, () => {
    console.log(`Your app has launched from the port ${PORT}`)
    // console.log(process.env.PORT)
})
//End Block for listening your app on defined port