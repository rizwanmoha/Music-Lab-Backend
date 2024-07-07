const express = require("express");
const router = express.Router();

const {registerController , loginController , googleController , forgotPassword} = require('../controllers/AuthController');


router.post('/register' , registerController
// #swagger.description = 'Register New Users To the Platform'

/*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Email and Password',
            schema: { 
                firstName: "Harshit",
                lastName: "Chauhan",
                email: "harshit.c21@gmail.com",
                password: "MeraPassword",
            }
    } */

/* #swagger.responses[200] = {
            description: 'Registration Successful',
            schema: {
               success: true,
               message: "Registration Successfully",
               user: {$ref: "#/definitions/User"},

            }
    } 
*/
/* #swagger.responses[400] = {
    description: 'Bad Request - User already exists',
    schema: {
        success: false,
        message: 'User already exists. Please login.'
    }
} */

/* #swagger.responses[409] = {
            description: 'Conflict - Missing or incomplete user details',
            schema: {
                success: "false",
                message: "Please fill all the details.",
             }
    } 
*/
/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        success: false,
        message: 'Error while registering.'
    }
} */
);


router.post('/login' , loginController
// #swagger.description = 'Logs New Users To the Platform'
/*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Email and Password',
            schema: { $ref: "#/definitions/EmailPassword" }
    } */

  /* #swagger.responses[200] = {
            description: 'Login Succussful',
            schema: {
               success: true,
               message: "Login Successfully",
               user: {$ref: "#/definitions/User"},
               token: "auth-adjasdlasldsadlkasdsda",
            }
    } 

    #swagger.responses[400] = {
            description: 'Teacher Not Approved By Admin',
            schema: {
               success: false,
               message : "Teacher is not approved contact to admin"
            }
    } 
    
    #swagger.responses[404] = {
            description: 'Login Failed',
            schema: {
               success: false,
               message: "User Not Registered",
            }
    }
    
    */
)

router.post('/google' , googleController
// #swagger.description = 'Google Login Route, allows user to login with their google account'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Google sign-in details',
    required: true,
    schema: {
        email: 'harshit.c21@iiits.in'
    }
} */

/* #swagger.responses[200] = {
    description: 'Sign in Successful',
    schema: {
        success: true,
        message: 'Sign in Successful',
        teacher: {$ref: '#/definitions/Teacher'},
        token: 'Bearersaiasd-asdasmdkasnd-asdnda'
    }
} */

/* #swagger.responses[401] = {
    description: 'Unauthorized - User not found with the provided email',
    schema: {
        success: false,
        message: 'User not found with email address'
    }
} */

/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        success: false,
        message: 'Internal server error'
    }
} */
);

router.post('/forgot', forgotPassword
// #swagger.description = 'Forgot Password Route, allows user to reset their password with their email address'
/* #swagger.parameters['body'] = {
    in: 'body',
    description: 'Password reset details',
    required: true,
    schema: { $ref: '#/definitions/EmailPassword' }
} */

/* #swagger.responses[201] = {
    description: 'Password Updated Successfully',
    schema: {
        success: true,
        message: 'Password updated successfully',
        user: {$ref: '#/definitions/User'} 
    }
} */

/* #swagger.responses[404] = {
    description: 'Not Found - User not found with the provided email',
    schema: {
        success: false,
        message: 'User not found with this email id'
    }
} */

/* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        success: false,
        message: 'Error while updating the password'
    }
} */
);


module.exports = router;

