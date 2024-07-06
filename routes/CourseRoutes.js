const express = require("express");
const { getSignature, createCourse, getCourseInfo, addSection, addVideoContent, editSectionHandler, deleteSectionHandler, deleteVideoContent, editVideoTitleHandler, getCourseDescription,getRatings, addComment, getComments , getCourse, rateCourse } = require("../controllers/CoursesController");
const router = express.Router();
const Multer = require("multer");
const bodyParser = require("body-parser");
const multer = require("multer");
const { requireSignIn } = require("../middleware/authmiddleware");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// Configure Multer to use Cloudinary as storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cover', // optional, destination folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // optional, allowed formats
    // other configuration options
  },
})

const upload = Multer({
  storage: storage
});

router.get('/get-signature', getSignature
// #swagger.description = 'Get Signature for Uploading Image on Cloudinary, Required for Uploading Image'
/* #swagger.responses[200] = {
    description: 'Signature generated successfully',
    schema: {
        signature: 'cloudinary_signature',
        timestamp: '12/07/2024:13:03:22PM'
    }
} */

/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */

);


router.post('/createcourse', requireSignIn,  (req,res,next)=>{console.log(req.files); next();},upload.single('image'), createCourse
// #swagger.description = 'Create A New Course'
/* #swagger.responses[200] = {
    description: 'Course created successfully',
    schema: {
        success: true,
        message: 'Course created successfully',
        course: {$ref: "#/definitions/Course"}
    }
} */
/* #swagger.responses[400] = {
    description: 'Bad Request - Invalid input data',
    schema: {
        success: false,
        message: 'Invalid input data'
    }
} */
/* #swagger.responses[404] = {
    description: 'Not Found - Teacher not found',
    schema: {
        success: false,
        message: 'Teacher not found'
    }
} */
);

router.post('/ratecourse', requireSignIn,  rateCourse
// #swagger.description = 'Rate the Course'
// #swagger.description = 'Rate a Course'
/*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Course ID and new rating',
            required: true,
            schema: { 
                courseId: "65d278b7342ef66267b5bb9b",
                newRating: "4"
            }
    } */

/* #swagger.responses[200] = {
            description: 'Success',
            schema: { 
                success: true,
                rating: {
                    userId: "2ef662b72675d34b5b78b9",
                    courseId: "5d278b7342ef66267b5bb9",
                    rating: "4"
                }
            }
    } */

/* #swagger.responses[501] = {
            description: 'Internal Server Error',
            schema: { 
                success: false,
                message: "Error"
            }
    } */

)

router.get('/getCourseRating/:id', getRatings
// #swagger.description = 'Gets the Rating of the Course'
/*  #swagger.parameters['path'] = {
            in: 'path',
            description: 'Course ID',
            required: true,
            schema: { 
                id: "b72675d34b34b34b5b"
            }
    } */

/* #swagger.responses[200] = {
            description: 'Success',
            schema: { 
                success: true,
                ratings: {
                    count: "12",
                    value: "3.4"
                }
            }
    } */

/* #swagger.responses[501] = {
            description: 'Internal Server Error',
            schema: { 
                success: false,
                message: "Error"
            }
    } */
)

router.post('/add-comment', addComment
// #swagger.description = 'Adds New Comment to the Course'
/* #swagger.responses[200] = {
    description: 'Comment added successfully',
    schema: {
        success: true,
        message: 'Comment added successfully'
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - Course not found',
    schema: {
        success: false,
        message: 'Course not found'
    }
} */

);

router.post('/get-comments', getComments
// #swagger.description = 'Gets All Comments of the Course'
 /* #swagger.responses[200] = {
            description: 'Comments Fetched Successfully',
            schema: { $ref: '#/definitions/Comments' }
    } */
)

router.post('/addcontent',requireSignIn, addVideoContent
// #swagger.description = 'Adds New Video Content to the Course'
);

router.post('/deletevideo', deleteVideoContent
// #swagger.description = 'Delete Video Content to the Course'
);
router.post('/editVideoTitle', editVideoTitleHandler
// #swagger.description = 'Edit Video Title Handler'
);
router.post('/addsection',  addSection
// #swagger.description = 'Adds New Section in the Course'
);
router.post('/editsection', editSectionHandler
// #swagger.description = 'Edits Section Title in the Course'
);
router.post('/deletesection', deleteSectionHandler
// #swagger.description = 'Deletes Section from the Course'
);

router.get('/description/:courseId', getCourseDescription
// #swagger.description = 'Gets the Description of the Course'
)
router.get('/:courseId', getCourseInfo
// #swagger.description = 'Gets the Information of the Course'
);

router.get('/singlecourse/:id', getCourse
// #swagger.description = 'Gets the Information of a single Course in complete detail'

);

module.exports = router;
