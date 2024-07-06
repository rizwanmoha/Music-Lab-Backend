const express = require("express");
const router = express.Router();

const {getAllQuery , getAllTeachers , getAllUsers , getAllCourses , getAllCategories , deleteCategory , createCategory , getPurchases , getDetails , updateCategory} = require('../controllers/AdminController');

router.get('/query' , getAllQuery 
// #swagger.description = 'Gets All Contact Us Queries'
);

router.get('/teacheruniversalSearch', getAllTeachers
// #swagger.description = 'Gets All Teachers'
);

router.get('/universalSearch' , getAllUsers
// #swagger.description = 'Search All Users'
);

router.get('/allcourses' , getAllCourses
// #swagger.description = 'Get All Courses From The Database'
);

router.get('/allcategories' , getAllCategories
// #swagger.description = 'Get All Categories From The Database'
);

router.delete('/deletecategories/:id' , deleteCategory
// #swagger.description = 'Delete A Category'
);

router.post('/create-category' , createCategory
// #swagger.description = 'Create A New Category'
);

router.get('/getpurchases' , getPurchases
// #swagger.description = 'Get All Purchases From The Database'
);

router.get('/custom' , getDetails
// #swagger.description = 'Get All Purchases From The Database'
)

router.put("/updatecategory/:id" ,updateCategory);

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


module.exports = router;