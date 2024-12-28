const express = require('express')
const movieCtl = require('../controller/movieCtl')
const Movie = require('../models/movieModel')
const router = express.Router()

router.get('/',movieCtl.viewMovies);

router.get('/addMovie',movieCtl.addMovie);

router.post('/insertMovie',Movie.uploadImage,movieCtl.insertMovie);

router.get('/singleMovie/:id',movieCtl.singleMovie);

router.use('/comment',require('../routes/commentRoutes'));

module.exports = router;