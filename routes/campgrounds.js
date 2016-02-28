var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

var middleware = require("../middleware")


router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});        
        }
    })
    
});

//CREATE A NEW CAMPGROUND
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username,
    };
    var newCampGround = {name: name, image:image, description:desc, author:author};
    //create new campground and push into database
    Campground.create(newCampGround, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Succesfully added ");
            console.log(newlyCreated)
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new") 
});


//SHOW 
router.get("/:id", function(req, res) {
    //Need to parse id and find campground with provided id
    //render show template
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if(err) {
           console.log(err);
       } 
       else {
           console.log(foundCampground)
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
})

//====================================================
// EDIT CAMPGROUND ROUTE
// Must check authorization details
router.get("/:id/edit", middleware.isOwner, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});



//====================================================
// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.isOwner, function(req, res){
   //find and update the correct campground, and redirect
   //redirect to show page
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err) {
          console.log(err);
          res.redirect("/campgrounds");
      } 
      else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//====================================================
//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.isOwner, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash("error", "An error occured while deleting the campground");
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    })
});

//====================================================



module.exports = router;