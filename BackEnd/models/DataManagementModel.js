const mongoose=require('mongoose')


//Date
const today=new Date()
const day= today.getDate()
const month=today.getMonth()
const year=today.getFullYear()
const time=today.getTime()
//Date

//Start Block Schema Creating
const dataUploadSchema=mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    status:{type:Number,default:1},
    softDeleteStatus:{type:Number,default:0},
    imagedetails:[
        {
            ImageUrl:{type:String},
            ImageName:{type:String},
            ImageMimeType:{type:String}
        }
    ],
    createdDate:{
        type:String,
        default:`${year}-${month}-${day}-${time}`
    }
},{timestamps:true})

module.exports= mongoose.model('NewsCollection',dataUploadSchema);