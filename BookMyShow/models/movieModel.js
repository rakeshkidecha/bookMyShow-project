const mongoose = require('mongoose');
const multer = require('multer')
const imagePath = '/uploads';
const path = require('path');

const MovieSchema =  mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    rating:{
        type:Number,
        required : true
    },
    movieType:{
        type:Array,
        required : true
    },
    language:{
        type:Array,
        required : true
    },
    timeDuration:{
        type:String,
        required : true
    },
    genre:{
        type:Array,
        required : true
    },
    criteria:{
        type:String,
        required : true
    },
    realeseDate:{
        type:String,
        required : true
    },
    coverImage:{
        type:String,
        required : true
    },
    description:{
        type:String,
        required : true
    },
})

const imageStrorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,"..",imagePath))
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

MovieSchema.statics.uploadImage = multer({storage:imageStrorage}).single('coverImage');
MovieSchema.statics.imgPath = imagePath;


const Movie = mongoose.model('Movie',MovieSchema);

module.exports = Movie;