const { URLSearchParams } = require('url');
const contactSchema = require('../models/contact.js');
const userSchema = require('../models/user.js');
const courseSchema = require('../models/course.js')
const videoSchema = require('../models/videos.js');
const purchaseSchema = require('../models/purchase.js')
const user = require('../models/user.js');
const ratingSchema = require('../models/rating.js');
const mongoose  = require("mongoose")

exports.AddToWishlist = async (req,res) => {
    
    const {courseId} = req.body;
    const userId = req.user.id;
    try {
        const user = await userSchema.findById(userId);
        console.log(user)

        if(!user){
          return  res.status(404).json({error: "User not found"});
        }

        if(!user.wishlist.includes(courseId)){
            user.wishlist.push(courseId);
            
            await user.save();
           return  res.status(200).json({message: "Course added to wishlist", course: courseId});
    } else {
        return res.status(400).json({error: "Course already in wishlist"});
        }
    } catch (e) {
        console.error("error: " + e.message);
        return res.status(500).json({ error: e.message });
    }   
}

exports.RemoveWishlist = async (req,res) => {
     
        const {courseId} = req.body;
        const userId = req.user.id;

        try {
            const user = await userSchema.findById(userId);
            
    
            if(!user){
                return res.status(404).json({error: "User not found"});
            }
    
            if(user.wishlist.includes(courseId)){
                user.wishlist.pull(courseId);
                await user.save();
                res.status(200).json({message: "The Respective Course is Removed from Wishlist"});
        } else {
            res.status(400).json({error: "Course not in wishlist"});
            }
        } catch (e) {
            console.error("error: " + e.message);
            res.status(500).json({ error: e.message });
        }   
}

exports.getWishlist = async (req,res) => {
   
    const userId = req.user.id;

    try {
        const user = await userSchema.findOne(userId).populate('wishlist','-sections');
        console.log(user);
        if(!user){
           return res.status(404).json({error: "User not found"});
        }
        
      return  res.status(200).json({wishlist: user.wishlist});
    } catch (e) {
        console.error("error: " + e.message);
       return res.status(500).json({ error: e.message });
    }
}

exports.getYourCourses = async (req,res) => {

 

    const userId = req.user.id;
    

    try {
        const user = await userSchema.findById(userId).populate({ path: 'courses', populate: {
            path: 'course' , populate: [{
                path: 'teacher',
                model: 'teachers',
                select: '-password -email -courses -isApproved -role -createdAt -updatedAt -__v'
            },{
                path: 'sections',
                model: 'sections'
            }]
        }
    });
    user.courses = user.courses.filter(course => course.course !== null);
    // console.log(user.courses[0].course)
        const ratings = await ratingSchema.aggregate([
            { 
              $match: { 
                userId: new mongoose.Types.ObjectId(userId), // Filter ratings by userId
                courseId: { $in: user.courses.map((course) => (course?.course._id))} 
              } 
            }
          ])
          console.log(ratings);

          const addRatingToCourses = (courses, ratings) => {
            // Create a map of ratings by courseId
            const ratingsMap = new Map();
            ratings.map(rating => ratingsMap.set(rating.courseId.toString(), rating.rating))
       
            
           const finalCourses = courses.map((courseItem) => {
              let courseId = courseItem.course._id;
              let rating = ratingsMap.get(courseId.toString()) || 0; // Default to 0 if rating not found
              console.log(rating)
              
              let updatedCourseItem = {
                ...courseItem, // Spread the properties of courseItem
                rating: rating // Update the course property
             };
              console.log(updatedCourseItem)
              return updatedCourseItem; 
            });

            return finalCourses;
          };
          
          // Add rating field to courses
          let courses1 = user.courses.toObject();
          const coursesWithRating = addRatingToCourses(courses1, ratings);
          console.log(coursesWithRating)
        if(!user){
           return res.status(404).json({error: "User not found"});
        }
        
        return res.status(200).json({success:true, courses: coursesWithRating});
    } catch (e) {
        console.error("error: " + e.message);
        return res.status(500).json({ error: e.message });
    }

}

exports.purchaseCourse = async (req,res) => {

    const { courseId} = req.body;
    const userId = req.user.id;
    try {
        const user = await userSchema.findById(userId);
        const course = await courseSchema.findById(courseId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        if(user.wishlist.includes(courseId)){
            user.wishlist.pull(courseId);
        }

        if(!user.courses.find((course)=>{course.course == courseId})){
            user.courses.push({course: courseId, progress: []});
            course.purchases += 1;

            let new_purchase = purchaseSchema.create({
                userId : userId,
                courseId : courseId,
                teachers : course.teacher 
            })

            let course_update = course.save();
            let user_update = user.save();
            
            await Promise.all([course_update, user_update, new_purchase]);
            return res.status(200).json({message: "Course purchased successfully", course: courseId});
        
        
        } else {
            return res.status(400).json({error: "Course already purchased, Refund Initilized"});
        }
    } catch (e) {
        console.error("error: " + e.message);
        return res.status(500).json({ error: e.message });
    }
}

exports.createQuery = async (req,res) => {
    const {firstName, lastName, email, message} = req.body;
    
    if(!firstName || !email || !message){
        return res.status(400).json({error: "Please fill all the fields"});
    }

    try {
        const query = await contactSchema.create({
            firstName,
            lastName,
            email,
            message
        })
        return res.status(200).json({message: "Query Submitted Successfully"});
    } catch (e) {
        console.error("error: " + e.message);
        res.status(500).json({ error: e.message });
    }
}

exports.getCourseProgress = async (req,res) => {

    const {courseId} = req.body;
    const userId = req.user.id;
    try {
    const user = await userSchema.findById(userId);
    
    if(!user){
      return res.status(401).send({success: false, message: "Could Not Find User"});
    }
    console.log(user.courses)
    const courseProg = user.courses.find((course)=>{return (course.course == courseId)});
    console.log(courseProg)
    return res.send({success: true, progress: courseProg.progress});
  } catch(e){
    console.log(e)
    return res.status(500).send({success: false, message: "Error while fetching progress"})
  }
}

exports.getAllCourseProgress = async (req,res) => {
    const {userId} = req.body;
    try {
        const user = await userSchema.findById(userId);
        if(!user){
            return res.status(401).send({success: false, message: "Could Not Find User"});
          }

          user.courses.map((course)=>{
                course.course = course.course.populate(course.course)
          })

        } catch (e){
            console.log(e);
            return res.status(501).send({success: false, message: "Error Please Try Again"})
        }
}
  

exports.updateCourseProgress  = async (req,res) => {
    
    const {courseId, videoId} = req.body;
    const userId = req.user.id;
    console.log(userId, courseId, videoId)
    if(!userId || !courseId || !videoId){
        return res.status(404).json({error: "Please fill all the fields"});
    }

    try {
        
        const user = await userSchema.findById(userId);
        const video = await videoSchema.findById(videoId);
        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        if(!video){
            return res.status(404).json({error: "Video not found"});
        }
        
        user.courses.map((course)=>{
            if(course.course == courseId){
                let found = false;
                course.progress.map((video)=>{
                    if(video.videoId == videoId){
                        video.watched = !video.watched;
                        found = true;
                    }
                    return video;
                })
                if(!found){
                    course.progress.push({videoId: videoId, watched: true})
                }
            }
            return course;
        })
        console.log(user.courses)
        await user.save();

        return res.status(200).json({message: "All Good", user})
    } catch (e) {
        console.log(e);
        return res.send(e)

    }

}