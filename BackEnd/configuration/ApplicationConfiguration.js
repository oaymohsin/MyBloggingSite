const dotenv = require('dotenv');
dotenv.config();
let MyEnivronment={};
if(process.env.NODE_ENV === 'development'){
    // console.log("heelo its working")
    MyEnivronment=dotenv.config({path:`${__dirname}/../Application-Configuration-Dev.env`});
}
if(process.env.NODE_ENV === 'testing'){
    MyEnivronment=dotenv.config({path:`${__dirname}/../Application-Configuration-Test.env`});
}
if(process.env.NODE_ENV === 'production'){
    MyEnivronment=dotenv.config({path:`${__dirname}/../Application-Configuration-Prod.env`});  
}

// Simplified version of this code
// const dotenv = require('dotenv');

// let envPath = '';

// if (process.env.NODE_ENV === 'testing') {
//   envPath = `${__dirname}/../Application-Configuration-Dev.env`;
// } else if (process.env.NODE_ENV === 'development') {
//   envPath = `${__dirname}/../Application-Configuration-Prod.env`;
// } else if (process.env.NODE_ENV === 'production') {
//   envPath = `${__dirname}/../Application-Configuration-Test.env`;
// }

// const MyEnivronment = dotenv.config({ path: envPath });

