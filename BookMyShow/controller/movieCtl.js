const Movie = require('../models/movieModel')
const Comment = require('../models/commentModel')

module.exports.viewMovies = async (req,res)=>{
    try {
        let searchQuery = '';

        if(req.query.searchQuery){
            searchQuery = req.query.searchQuery;
        }

        let perPageDate = 5;
        let page = 0;

        if(req.query.page){
            page = req.query.page;
        }

        const allMovies = await Movie.find({
            $or:[
                {title:{$regex:searchQuery,$options : "i"}},
                {language:{$regex:searchQuery,$options : "i"}},
                {genre:{$regex:searchQuery,$options : "i"}},
            ]
        }).skip(perPageDate*page).limit(perPageDate);

        const allRecored = await Movie.find({
            $or:[
                {title:{$regex:searchQuery,$options : "i"}},
                {language:{$regex:searchQuery,$options : "i"}},
                {genre:{$regex:searchQuery,$options : "i"}},
            ]
        }).countDocuments();

        const totalCountes = Math.ceil(allRecored/perPageDate);

        return res.render('movie/viewMovies',{allMovies,searchQuery,page:parseInt(page),totalCountes})
    } catch (err) {
        console.log("Something Wrong",err);
        return res.redirect('back')     
    }
}

module.exports.addMovie = async (req,res)=>{
    try {
        let searchQuery = '';
        return res.render('movie/addMovie',{searchQuery})
    } catch (err) {
        console.log("Something Wrong",err);
        return res.redirect('back')     
    }
}

module.exports.insertMovie = async(req,res)=>{
    try {
        var imgaePath = '';

        if(req.file){
            imgaePath = Movie.imgPath+'/'+req.file.filename;
        }

        req.body.coverImage = imgaePath;
        req.body.timeDuration = req.body.hours+'h '+req.body.minutes+'m';


        const addedMovie = await Movie.create(req.body);
        if(addedMovie){
            console.log("Movie Add successfully..");
            return res.redirect('/');
        }else{
            console.log("fail to add movie..");
            return res.redirect('back');
        }

    } catch (err) {
        console.log("Something Wrong",err);
        return res.redirect('back')     
    }
}


module.exports.singleMovie = async(req,res)=>{
   
    try {
        let searchQuery = '';
        const singleMovie = await Movie.findById(req.params.id);

        const allComment = await Comment.find({id:singleMovie.id});

        return res.render('movie/singleMovie',{singleMovie,allComment,searchQuery});
    } catch (err) {
        console.log("Something Wrong",err);
        return res.redirect('back')     
    }
}