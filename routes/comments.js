var express = require("express");
//mergeparams merges parameters from app.js app.use() and this export
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground")
var Comment = require("../models/comment");

var middleware = require("../middleware");


// ===============================
// COMMENTS ROUTES
// ===============================

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by Id, send throuhg when rendered
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else {
            res.render("comments/new", {campground:campground});           
        }
    })
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    // Lookup campground, create comment, connect comment to campground, and redirect to show page 
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }
                else {
                    //add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Sucessfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});



//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.isCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment})
        }
    })
});

//COMMENTS UPDATE ROUTE
router.put("/:comment_id/edit", middleware.isCommentOwner, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err) {
           console.log(err);
           req.flash("error", "An error occured while updating the comment");
           res.redirect("back");
       }
       else {
           req.flash("success", "Succesfully updated comment");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});


//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.isCommentOwner, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err) {
           console.log(err);
           req.flash("error", "An error occured while deleting the comment");
           res.redirect("back");
       }
       else {
           req.flash("success", "Succesfully deleted comment");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

//=================================================================



module.exports = router;