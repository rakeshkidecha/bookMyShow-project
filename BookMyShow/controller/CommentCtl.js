const Comment = require('../models/commentModel')

module.exports.inserComment = async(req,res)=>{
    try {
        const addedComment = await Comment.create(req.body);
        
        return res.redirect('back');
    } catch (err) {
        console.log("Something Wrong",err);
        return res.redirect('back')     
    }
}