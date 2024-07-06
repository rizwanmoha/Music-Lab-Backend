const app = require("express");
const router = app.Router();


const {InstructorDataController} = require('../controllers/InstructorController.js');
const { AddToWishlist, RemoveWishlist, getWishlist, createQuery, purchaseCourse, updateCourseProgress, getCourseProgress, getYourCourses } = require("../controllers/UserController.js");
const { getTeacherAndCourses } = require('../controllers/TeacherProfileController.js');
const {updateTeacherProfile} = require('../controllers/TeacherEditProfileController.js');
const {dashboardTeacherProfile} = require('../controllers/DashboardTeacherProfileController.js')
const {updateStudentProfile, getStudent} = require('../controllers/StudentEditProfileController');

const { requireSignIn } = require("../middleware/authmiddleware.js");


router.get('/wishlist',requireSignIn, getWishlist
// #swagger.description = 'Gets a Users Wishlist using their ID'
/* #swagger.responses[200] = {
    description: 'Wishlist fetched successfully',
    schema: {
        wishlist: [{
            courseId: '65d7c494c44cec15f9adf35c'
        },
        {
            courseId: '65d7c494c44cec15f9adf35d'
        }
    ] 
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User not found',
    schema: {
        error: 'User not found'
    }
} */


)

router.get('/your-courses/:id',requireSignIn, getYourCourses
// #swagger.description = 'Gets a Users Courses using their ID'

/* #swagger.responses[200] = {
    description: 'Courses retrieved successfully',
    schema: {
        success: true,
        courses: [
            {
                course: {
                    _id: '65d7c494c44cec15f9adf35c',
                    title: 'Sample Course A',
                    description: 'This is a sample course description',
                },
                sections: [],
                teacher: {$ref: '#/definitions/Teacher'}, 
                rating: 4.5 
            },
        ]
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User not found',
    schema: {
        error: 'User not found'
    }
} */


);

router.post("/add-to-wl", requireSignIn, AddToWishlist
// #swagger.description = 'Adds a Course to the Wishlist'
/* #swagger.security = [{
    "BearerAuth": []
}] */

/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Course ID',
    required: true,
    schema: {
        courseId: "65d7c494c44cec15f9adf35c"
    }
} */

/* #swagger.responses[200] = {
    description: 'Course added to wishlist successfully',
    schema: {
        message: "Course added to wishlist",
        course: '65d7c494c44cec15f9adf35c' 
    }
} */

/* #swagger.responses[400] = {
    description: 'Bad Request - Course already in wishlist',
    schema: {
        error: 'Course already in wishlist'
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User not found',
    schema: {
        error: 'User not found'
    }
} */
)

router.post("/remove-wishlist", requireSignIn, RemoveWishlist
// #swagger.description = 'Removes a Course from the Wishlist'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Course ID',
    required: true,
    schema: {
        courseId: '65d7c494c44cec15f9adf35c' 
    }
} */
/* #swagger.responses[200] = {
    description: 'Course removed from wishlist successfully',
    schema: {
        message: 'The respective course is removed from the wishlist'
    }
} */

/* #swagger.responses[400] = {
    description: 'Bad Request - Course not in wishlist',
    schema: {
        error: 'Course not in wishlist'
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User not found',
    schema: {
        error: 'User not found'
    }
} */
)

router.post("/purchase", requireSignIn, purchaseCourse
// #swagger.description = 'Purchases a Course'

/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Course ID',
    required: true,
    schema: {
        courseId: '65d7c494c44cec15f9adf35c' 
    }
} */

/* #swagger.responses[200] = {
    description: 'Course purchased successfully',
    schema: {
        message: 'Course purchased successfully',
        course: '65d7c494c44cec15f9adf35c' 
    }
} */

/* #swagger.responses[400] = {
    description: 'Bad Request - Course already purchased',
    schema: {
        error: 'Course already purchased, refund initiated'
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User or course not found',
    schema: {
        error: 'User not found or Course not found'
    }
} */

)


router.post('/course/progress', requireSignIn, updateCourseProgress
// #swagger.description = 'Updates the Progress of a Course'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Course and video details',
    required: true,
    schema: {
        courseId: '65d7c494c44cec15f9adf35c',
        videoId: '789def012345abcde67890fg'
    }
} */

/* #swagger.responses[200] = {
    description: 'Course progress updated successfully',
    schema: {
        message: 'All Good',
        user: { $ref: '#/definitions/User' }
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User, course, or video not found',
    schema: {
        error: 'User not found, Course not found, or Video not found'
    }
} */

)

router.post('/course/get-progress', requireSignIn, getCourseProgress
// #swagger.description = 'Gets the Progress of a Course'
)


router.post("/contactus",createQuery
// #swagger.description = 'Creates a Query'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Query details',
    required: true,
    schema: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        message: 'This is a sample query message'
    }
} */

/* #swagger.responses[200] = {
    description: 'Query submitted successfully',
    schema: {
        message: 'Query Submitted Successfully'
    }
} */

/* #swagger.responses[400] = {
    description: 'Bad Request - Missing required fields',
    schema: {
        error: 'Please fill all the fields'
    }
} */
)

router.get('/instructorData', InstructorDataController
// #swagger.description = 'Gets all the Instructors'
);

router.get('/teacher/:id', getTeacherAndCourses
// #swagger.description = 'Gets a Teacher and their Courses'
);


router.put('/teachereditprofile/:id',updateTeacherProfile
// #swagger.description = 'Updates the Profile of a Teacher'
);

router.put('/studenteditprofile/:id',updateStudentProfile
// #swagger.description = 'Update The Profile of a Student'
);

router.get('/dashboardteacherprofile/:id', dashboardTeacherProfile);
router.get('/studentprofile/:id', getStudent);

module.exports = router;