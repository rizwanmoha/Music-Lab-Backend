const express = require("express");
const router = express.Router();
const {requireSignIn, isAdmin} = require('../middleware/authmiddleware');

const {getAllQuery , getAllTeachers , getAllUsers , getAllCourses , getAllCategories , deleteCategory , createCategory , getPurchases , getDetails , updateCategory} = require('../controllers/AdminController');

router.get('/query' , requireSignIn, isAdmin,  getAllQuery 
// #swagger.description = 'Gets All Contact Us Queries'
);

router.get('/teacheruniversalSearch', requireSignIn, isAdmin, getAllTeachers
// #swagger.description = 'Gets All Teachers'
);

router.get('/universalSearch' , requireSignIn, isAdmin, getAllUsers
// #swagger.description = 'Search All Users'
);

router.get('/allcourses' , requireSignIn,  getAllCourses
// #swagger.description = 'Get All Courses From The Database'
);

router.get('/allcategories' , requireSignIn, isAdmin, getAllCategories
// #swagger.description = 'Get All Categories From The Database'
);

router.delete('/deletecategories/:id' , requireSignIn, isAdmin, deleteCategory
// #swagger.description = 'Delete A Category'
);

router.post('/create-category' , requireSignIn, isAdmin, createCategory
// #swagger.description = 'Create A New Category'
);

router.get('/getpurchases' , requireSignIn, isAdmin, getPurchases
// #swagger.description = 'Get All Purchases From The Database'
);

router.get('/custom' ,   getDetails
// #swagger.description = 'Get All Purchases From The Database'
)

router.put("/updatecategory/:id", requireSignIn, isAdmin, updateCategory);

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


module.exports = router;