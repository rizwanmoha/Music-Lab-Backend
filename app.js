const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors  = require('cors');
// const fileUpload = require('express-fileupload');
const path = require('path');
const morgan=require('morgan')
let rfs=require('rotating-file-stream');
const multer = require("multer");
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const swaggerAutogen = require('swagger-autogen')();



dotenv.config();


const swaggerFile = require('./swagger-output.json')
let accessLogStream=rfs.createStream("access.log",{interval:'1d',path:path.join(__dirname,'log')})



const app = express();


app.use(morgan(':date[iso] :method :url :status :response-time ms', { stream: accessLogStream}));
app.use('/images',express.static(__dirname+'/images'));



const AuthRoutes = require("./routes/AuthRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");
const paymentRoutes = require("./routes/PaymentRoutes.js");
const TeacherRoutes = require('./routes/TeacherRoutes.js');
const courseRoutes = require("./routes/CourseRoutes.js");
const AdminRoutes = require('./routes/AdminRoutes.js');
const connectDb = require('./database/db.js');


const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); 
// app.use(upload.single('file'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(bodyParser.raw())
app.use(cors());


connectDb();


app.use("/api/v1/user",
  // #swagger.tags = ['Auth']
  // #swagger.produces = ['application/json']

  /* #swagger.responses[409] = {
      description: 'Form Validation Failed',
      schema: { $ref: "#/definitions/FormValidationError" },
    }

    #swagger.responses[500] = {
      description: 'Internal Server Error',
      schema: {
          error: "Internal Server Error"
      }
  } */

  AuthRoutes
);

app.use("/api/v1/user",
  // #swagger.tags = ['Users']
  // #swagger.produces = ['application/json']
  /* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */
  UserRoutes
);

app.use("/api",
  // #swagger.tags = ['Payment']
  // #swagger.produces = ['application/json']
  /* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */
  paymentRoutes
);
app.use("/api/v1/teacher",
  // #swagger.tags = ['Teacher']
  // #swagger.produces = ['application/json']
  /* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */
  TeacherRoutes
);

app.use("/api/course",
  // #swagger.tags = ['Course']
  /* #swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        error: 'Internal server error message'
    }
} */
  courseRoutes
);

app.use("/api/v1/admin",
  // #swagger.tags = ['Admin']
  // #swagger.produces = ['application/json']
  AdminRoutes
);


app.get('/test', (req,res)=>{
  // #swagger.tags = ['Testing']
  // #swagger.description = 'This is a Test route to check health of Server'
  /* #swagger.responses[200] = {
            description: 'Server Running',
            schema: {
               message: "This is Working",
            }
    } */
  return res.send({message: "This is Working"})
})


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

let PORT = 8000;
if(process.env.NODE_ENV == "test"){
  PORT = 0;
}
app.listen(PORT, (req, res) => {
    console.log(`server is listening on PORT number ${PORT}`);
})



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


module.exports = app;