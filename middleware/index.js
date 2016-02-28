//all middleware goes here
var Campground = require("../models/campground")
var Comment = require("../models/comment")


var middlewareObj = {};

middlewareObj.isOwner = function(req, res, next) {
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found");
                    console.log(err);
                    res.redirect("back");
                } 
                else {
                    //does user own campground?
                    if(foundCampground.author.id.equals(req.user._id)) { 
                        next();
                    }
                    else {
                        req.flash("error", "You don't have permissions to do that");
                        res.redirect("back")
                    }
                }
        });
        }
        else {
            console.log("not logged in");
            req.flash("error", "You need to be logged in to do that");
            res.redirect("/login");
        }
}


middlewareObj.isCommentOwner = function(req, res, next) {
     if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                    req.flash("error", "Cannot find comment");
                    res.redirect("back");
                } 
                else {
                    //does user own comment?
                    if(foundComment.author.id.equals(req.user._id)) { 
                        next();
                    }
                    else {
                        req.flash("error", "You don't have permissions to do that");
                        res.redirect("back")
                    }
                }
        });
        }
        else {
            console.log("not logged in");
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back")
        }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middlewareObj;