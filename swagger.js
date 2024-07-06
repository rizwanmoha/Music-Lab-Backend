const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    // name of your api
    title: "Music Labs API",
    description:
      "This is the API Documentation for the Music Labs Application. The Backend relies on Express for routing, MongoDB for Database and JWT for Authentication along with cloudinary for image and video storage",
  },
  definitions: {

    User: {
      firstName: "Harshit",
      lastName: "Chauhan",
      email: "test@email.com",
      password: "$2b$10$ZAdSkEDp0zT1r9zUJ/Y/HuNJkOKkPrePn3UPk6eCxiMGb9a/rTDW",
      role: "User",
      wishlist: [],
      _id: "65d09daa60a9d925c87a6a0c",
      courses: [],
      createdAt: "2024-04-29T19:57:53.187Z",
      updatedAt: "2024-04-29T19:57:53.187Z",
    },

    Teacher: {
      firstName: "Harshit",
      lastName: "Chauhan",
      email: "test@email.com",
      password: "$2b$10$ZAdSkEDp0zT1r9zUJ/Y/HuNJkOKkPrePn3UPk6eCxiMGb9a/rTDW",
      role: "Teacher",
      courses: [],
      _id: "65d09daa60a9d925c87a6a0c",
      createdAt: "2024-04-29T19:57:53.187Z",
      updatedAt: "2024-04-29T19:57:53.187Z",
    },
    
    EmailPassword: {
      email: "harshit@gmail.com",
      password: "MeraPassword",
    },

    Wishlist: [{
      _id: "65d09daa60a9d925c87a6a0c",
      course: "65d7bfcef6e43a005af95bb5",

      user: "65d09daa60a9d925c87a6a0c",
    }],

    UnauthorizedError: {  
        success: "false",
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed"
        },
        message: "Unauthorized Access"
    },

    FormValidationError: {
      success: "false",
      message: "Please fill all the details " 
    },
    InternalServerError: {
      success: false,
      message: "Something Went Wrong, Please Try Again!"
    },
    Course: {
      _id: '65d278b7342ef66267b5bb9b',
      title: 'Rock in 5 Days',
      description: 'Course Description',
      price: 1200,
      category: 'Rock',
      teacher: 't65d278b7342eadsh85bb9b',
      imageUrl: 'https://example.com/course-image.jpg',
      sections: [],
      createdAt: '2024-02-03T14:57:48.561Z',
      updatedAt: '2024-02-03T14:58:19.598Z',
    },

    Rating: {
      Rating: 5,
      userId: "a65d09daa60jad12dasndad",
      courseId: "65d7bfcef6e43a005af95bb5"
    },

    Comments: [
      {
        comment: "Wow this is an Amazing Course",
        userId: "65d09daa60a9d925c87a6a0c",
        courseId: "65d7bfcef6e43a005af95bb5",
      },
    ],
  },
  host: "localhost:8000",
};

const outputFile = './swagger-output.json';
// assuming your routes are located in app.js
const routes = ['./app.js'];
swaggerAutogen(outputFile, routes, doc);