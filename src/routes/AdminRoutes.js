const express = require("express");
const router = express.Router();
const {requireSignIn} = require('../middleware/authmiddleware');

const {getAllQuery , getAllTeachers , getAllUsers , getAllCourses , getAllCategories , deleteCategory , createCategory , getPurchases , getDetails , updateCategory} = require('../controllers/AdminController');

router.get('/query' , requireSignIn,  getAllQuery 
// #swagger.description = 'Gets All Contact Us Queries'
);

router.get('/teacheruniversalSearch', requireSignIn, getAllTeachers
// #swagger.description = 'Gets All Teachers'
);

router.get('/universalSearch' , requireSignIn, getAllUsers
// #swagger.description = 'Search All Users'
);

router.get('/allcourses' , requireSignIn, getAllCourses
// #swagger.description = 'Get All Courses From The Database'
);

router.get('/allcategories' , requireSignIn, getAllCategories
// #swagger.description = 'Get All Categories From The Database'
);

router.delete('/deletecategories/:id' , requireSignIn, deleteCategory
// #swagger.description = 'Delete A Category'
);

router.post('/create-category' , requireSignIn, createCategory
// #swagger.description = 'Create A New Category'
);

router.get('/getpurchases' , requireSignIn, getPurchases
// #swagger.description = 'Get All Purchases From The Database'
);

router.get('/custom' , requireSignIn, getDetails
// #swagger.description = 'Get All Purchases From The Database'
)

router.put("/updatecategory/:id" ,updateCategory);

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


module.exports = router;