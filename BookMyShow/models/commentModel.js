const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    movieComment :{
        type : String,
        required : true
    },
    id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Movie'
    }
})

const Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;