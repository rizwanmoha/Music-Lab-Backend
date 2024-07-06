const express = require('express');


const router = express.Router();

const {registerController , listOfTeachers , updateRequest , ignoreRequest, getSingleTeacher } = require('../controllers/TeacherController');
const {teacherDashboardStudentList, deleteTeacherDashboardStudent,numberOfStudentTeacherDashboard,courseWithCategory,totalEarnedMoney, studentComment} = require('../controllers/DashboardTeacherProfileController.js');

router.post('/register' , registerController);

router.get('/lsitofteachersrequest' , listOfTeachers
// #swagger.description = 'Get List of Teachers Request'
/* #swagger.responses[200] = {
    description: 'List of teachers retrieved successfully',
    schema: {
        success: true,
        message: 'List of all Teachers Accept request',
        teachers: [{$ref: "#/definitions/Teacher"}]
    }
} */

/* #swagger.responses[502] = {
    description: 'Bad Gateway - Cache retrieval error',
    schema: {
        success: false,
        message: 'Something Went Wrong with the Cache'
    }
} */
);

router.put('/acceptrequest/:id' , updateRequest
/* #swagger.parameters['id'] = {
    in: 'path',
    description: 'Teacher ID',
    required: true,
    type: 'string'
} */

/* #swagger.responses[200] = {
    description: 'Teacher request updated successfully',
    schema: {
        message: 'Teacher request updated successfully',
        teacher: {$ref: "#/definitions/Teacher"}
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - Teacher not found with the specified ID',
    schema: {
        message: 'Teacher not found'
    }
} */
);

router.delete('/ignorerequest/:id' , ignoreRequest
/* #swagger.responses[200] = {
    description: 'Teacher request deleted successfully',
    schema: {
        message: 'Teacher request deleted successfully',
        teacher: {$ref: "#/definitions/Teacher"}
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - Teacher not found with the specified ID',
    schema: {
        message: 'Teacher not found'
    }
} */

/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        message: 'Internal server error'
    }
} */
)


router.get('/teacher/studentlist/:id',teacherDashboardStudentList,
// #swagger.description = 'Get Student List of a particular teacher'
);

router.delete('/teacherdashboard/student/:id', deleteTeacherDashboardStudent,
// #swagger.description = 'Delete Student from Teacher Dashboard'
);

router.get('/teacher/numberofstudent/:id',numberOfStudentTeacherDashboard,
// #swagger.description = 'Get Number of Students'
);

router.get('/teacher/noofcourseandcoursewithcategory/:id',courseWithCategory
// #swagger.description = 'Get Number of Courses and Courses with Category'
);

router.get('/teacher/earnmoney/:id',totalEarnedMoney
// #swagger.description = 'Get Total Earned Money'
);

router.get('/getTeacher/:id' , getSingleTeacher,
// #swagger.description = 'Get Single Teacher'
)

router.get('/teacher/studentcomment/:id',studentComment
// #swagger.description = 'Get Student Comments'
);

module.exports =  router;
