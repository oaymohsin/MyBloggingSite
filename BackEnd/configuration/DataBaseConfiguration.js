const Package=require('../package.json')
require('dotenv')

const mongoose=require('mongoose')
async function connectToMongoDB(){
   try {
    
    console.log(process.env.MONGO_URI);
    console.log(process.env.NODE_ENV)
    console.log(process.env.PORT)

// const uri='mongodb+srv://oaymohsin:Msn76510063@cluster0.sejsotc.mongodb.net/admin?authSource=admin&replicaSet=atlas-up5crs-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

    await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,
        useUnifiedTopology:true});
            
                console.log(`\nMongoDb connected Successfully at MongoAtlas\n`);
                console.log("Your app has the following dependencies\n");
                for(let dependencies in Package.dependencies){
                    console.log(dependencies)
                }
            
            // else{console.log('Error:Not connected to the MongoDB'+error)}
        


   } catch (error) {
    console.error('Error:Not connected to the MongoDB', error)
   }

}
connectToMongoDB();