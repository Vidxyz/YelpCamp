var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [ 
    {
        name: "Clouds Rest", 
        image: "https://res.cloudinary.com/roadtrippers/image/upload/w_640,fl_progressive,q_60/v1447345462/g7y1xmz5lvmvigkuqs50.jpg",
        description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    },
    {
        name: "Clouds Rest", 
        image: "https://res.cloudinary.com/roadtrippers/image/upload/w_640,fl_progressive,q_60/v1447345462/g7y1xmz5lvmvigkuqs50.jpg",
        description: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    },
    {
        name: "Clouds Rest", 
        image: "https://res.cloudinary.com/roadtrippers/image/upload/w_640,fl_progressive,q_60/v1447345462/g7y1xmz5lvmvigkuqs50.jpg",
        description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
    },

]

function seedDB() {
    
    //Remove all camprounds
    Campground.remove({}, function(err) {
        if(err){
            console.log(err)
        }
        else {
            console.log("Removed campgrounds")
        }
        data.forEach(function(seed) {
            Campground.create(seed, function(err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("created campground");
                    //Creating comment
                    Comment.create(
                            {
                                text: "NO INTERNET!?!?!?!", author:"Homer Simpson",
                                
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err)
                                }
                                else {
                                    data.comments.push(comment);
                                    data.save();
                                    console.log("created new comment")
                                }
                            }
                        );
                }
            })
        });
    });

}

module.exports = seedDB;

