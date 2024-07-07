const teacherSchema = require('../models/teacher.js');
const coursesSchema = require('../models/course.js');
const categorySchema = require('../models/category.js');
const sectionSchema = require('../models/sections.js');
const videoSchema = require('../models/videos.js');
const commentSchema = require('../models/comment.js')
const ratingSchema = require('../models/rating.js')
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const { redisClient } = require('../database/cache.js');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  const apiSecret = cloudinary.config().api_secret;
  
 


exports.getSignature = async (req,res) => {
     

  const timestamp = Math.round((new Date).getTime()/1000);

  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    folder: 'MastersOfMusic'}, apiSecret);
  
    res.send({signature, timestamp});


//     upload(req, res, async (err) => {
//       if (err) {
//         return res.json({ errors: err });
//       }
//     try {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//         const cldRes = await handleUploadVideo(dataURI);
//         res.json(cldRes);
//       } catch (error) {
       
//         res.send({
//           message: error.message,
//         });
//       }


//     res.send({message: "Video Uploaded"})

// })
}
//Redis Working !!!
exports.getCourseDescription = async (req,res) => {
  const {courseId} = req.params;

  try{
    
    redisClient.get(courseId, async (err, cachedData) => {
      if (err) throw err;

    if (cachedData) {
     return res.json(JSON.parse(cachedData));
    } else {
     const course = await coursesSchema.findById(courseId).populate([{path :'category'},{path: 'teacher', 
      select: '-password' },{path: 'sections'}])
     if(!course){
        return res.status(404).send({success: false, message: "Course not found"});
     }
      redisClient.setex(courseId, 3600, JSON.stringify({success: true, message: "Course fetched successfully", course: course}));
      return res.status(200).send({success: true, message: "Course fetched successfully", course});
  
  }}
    )

} catch(e){
    console.log(e);
    return res.status(500).send({success: false, message: "Error while fetching course"});
  }

}

exports.getCourseInfo = async (req,res) => {
  const {courseId} = req.params;
    try{


        const course = await coursesSchema.findById(courseId).populate({path: "sections",
        populate: {path: "videos"}
        })
        

       
        
        if(!course){
            return res.status(404).send({success: false, message: "Course not found"});
        }
        return res.status(200).send({success: true, message: "Course fetched successfully", course});
      }
    catch (error){
        
        console.log(error);
        return res.status(500).send({success: false, message: "Error while fetching course"});
    }
}

exports.addComment = async (req,res) => {
  try{
    const {courseId, comment, userId} = req.body;
    const course = await coursesSchema.findById(courseId);
    if(!course){
      return res.status(404).send({success: false, message: "Course not found"});
    }
    
    const newComment = await commentSchema.create({comment, userId, courseId});
    return res.status(200).send({success: true, message: "Comment added successfully"});

  } catch (error){
    console.log(error);
    return res.status(500).send({success: false, message: "Error while adding comment"});
  }
}

exports.getComments = async (req,res) => {
  
  try{
    const {courseId} = req.body;
    const comments = await commentSchema.find({courseId}).populate({
      path: "userId",
      select: "-password -email -wishlist" 
  });
    return res.status(200).send({success: true, message: "Comments fetched successfully", comments});
  } catch (error){
    console.log(error);
    return res.status(500).send({success: false, message: "Error while fetching comments"});
  }
}

exports.createCourse = async (req,res) => {

  const teacherId = req.user.id;
    try{
      
      console.log(req.file.path);
      console.log("inside create course");

        const {title, description, price, category, instructor} = req.body;
      
        
        const teacher = await teacherSchema.findById(teacherId);
        if(!teacher){
            return res.status(404).send({success: false, message: "Teacher not found"});
        }
        // await categorySchema.create({name: category})

        const categoryId = await categorySchema.findOne({name: category})
     
        // console.log(categoryId);

        const course = await coursesSchema.create({
            title : title,
            description: description,
            price: price,
            category: categoryId._id,
            teacher: teacherId,
            imageUrl: req.file.path,
            sections: []
        });

        console.log(course)
        return res.status(200).send({success: true, message: "Course created successfully", course});
    } catch (error){
      console.log(error)
        return res.status(500).send({success: false, message: "Error while creating course"});
    }

}


exports.addSection = async (req,res) => {
    try{
        const {courseId, sectionName} = req.body;
        console.log(courseId);
        const course = await coursesSchema.findById(courseId);
  
        if(!course){
            return res.status(404).send({success: false, message: "Course not found"});
        }
        
        const section = await sectionSchema.create({name: sectionName, videos: []});
        course.sections.push(section);
        await course.save();
        return res.status(200).send({success: true, message: "Section added successfully", section});
    } catch (error){
        return res.status(500).send({success: false, message: "Error while adding section"});
    }
}

exports.editSectionHandler = async (req,res) => {
  try {
    const {sectionId, newName} = req.body;
    const section = await sectionSchema.findById(sectionId);
    if(!section){
      return res.status(404).send({success: false, message: "Section not found"});
    }
    section.name = newName;
    await section.save();
    return res.status(200).send({success: true, message: "Section updated successfully", section});
  } catch (e) {
    console.log(e)
    return res.status(500).send({success: false, message: "Error while updating section"});
  }
}

exports.deleteSectionHandler = async (req,res) => {
  try {
    const {sectionId} = req.body;
    const section = await sectionSchema.findByIdAndDelete(sectionId);
    if(!section){
      return res.status(404).send({success: false, message: "Section not found"});
    }
    return res.status(200).send({success: true, message: "Section deleted successfully"});
  } catch (e){
    console.log(e)
    return res.status(500).send({success: false, message: "Error while deleting section"});
  }
}



exports.addVideoContent = async (req,res) => {
    try{
        const {sectionId, videoName, videoUrl} = req.body;
        const user = req.user.id
        const [section, vid] = await Promise.all([
          sectionSchema.findById(sectionId),
          videoSchema.create({name: videoName, url: videoUrl})
      ]);
      
        
        if(!section){
            return res.status(404).send({success: false, message: "Section not found"});
        }

        section.videos.push(vid);
        
        await section.save();
        console.log(section)
        return res.status(200).send({success: true, message: "Video added successfully", vid});
    } catch (error){
        console.log(error)
        return res.status(500).send({success: false, message: "Error while adding video"});
    }
}

exports.deleteVideoContent = async (req,res) => {
  try {
    const {videoId} = req.body;
    const video = await videoSchema.findByIdAndDelete(videoId);
    if(!video){
      return res.status(404).send({success: false, message: "Video not found"});
    }
    return res.status(200).send({success: true, message: "Video deleted successfully"});
  } catch (e){
    console.log(e)
    return res.status(500).send({success: false, message: "Error while deleting video"});
  }
}

exports.editVideoTitleHandler = async (req,res) => {
  try {
    const {lessonId, newName} = req.body;
    const video = await videoSchema.findById(lessonId);
    if(!video){
      return res.status(404).send({success: false, message: "Video not found"});
    }
    video.name = newName;
    await video.save();
    return res.status(200).send({success: true, message: "Video updated successfully", video});
  } catch (e) {
    console.log(e)
    return res.status(500).send({success: false, message: "Error while updating video"});
  }


}


exports.getCourse = async(req , res) =>{
  try{
    
    const id = req.params.id;
    const cid = id.slice(1);
   
    const course = await coursesSchema.findById(cid);
    
    return res.status(200).send({success : true , message : "Course Details" , course});

  }
  catch(error){
      return res.status(500).send({success : false , message : "Internal server error" });
  }

}

exports.rateCourse = async(req, res) => {
  const userId = req.user.id;
  
  try {
    const {courseId,newRating} = req.body;

    const rating = await ratingSchema.findOne({userId: userId, courseId: courseId})
    console.log("HERERERERERR")
    console.log(rating)
    if(!rating){
    rating = await ratingSchema.create({
      userId : userId,
      courseId: courseId,
      rating: newRating
    })
  } else {
      console.log('ok')
      rating.rating = newRating;
      await rating.save()
    }

    return res.status(200).send({success: true, rating})

  }  catch(e){
    console.log(e)
    return res.status(501).send({success: false, message: "Error"})
  }
}

exports.getRatings = async(req,res) => {
  try{
  const courseId = req.params.id;
  console.log(courseId)
  
  const ratings = await ratingSchema.aggregate([
    { $match: { courseId: new mongoose.Types.ObjectId(courseId) }}, // Filter ratings by courseId
    {
      $group: {
        _id: '$courseId',
        count: { $sum: 1 }, // Count the number of ratings
        averageRating: { $avg: '$rating' } // Calculate the average rating
      }
    }
  ])

  console.log(ratings)
  return res.status(200).send({success: true, ratings: {count: ratings[0]?.count ? ratings[0]?.count : 0, value: ratings[0]?.averageRating}})

  } catch(e){
    console.log(e)
    return res.status(501).send({success: false, message: "Error"})
  }

}
