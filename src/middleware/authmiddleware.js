
const JWT = require('jsonwebtoken');
const adminModel =  require('../models/admin.js');
const teacherModel = require('../models/teacher.js')

exports.requireSignIn = async(req , res , next) =>{
   
    try{
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'Authorization header is missing',
            });
        }

        let token = authHeader;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.slice(7);  
        }

        console.log('Extracted Token:', token);

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token is missing',
            });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch(error){
        res.status(401).send({
            success: false,
            error, 
            message: 'Unauthorized Access',
        })
        console.log(error);
    }
}

exports.isTeacher = async (req , res , next) =>{
    try{
        const user = await teacherModel.findById(req.user.id);
        if(!user){
            return res.status(401).send({
                success: false,
                message : 'Unauthorized Access'
            })
        }
        else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            error, 
            message: 'Error in Teacher  middleware',
        })
    }
}

exports.isAdmin = async (req , res , next) =>{
    try{
        const user = await adminModel.findById(req.user.id);
        console.log("Getting User" , user);
        if(!user){
            return res.status(401).send({
                success: false,
                message : 'Unauthorized Access'
            })
        }
        else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success: false,
            error, 
            message: 'Error in Admin  middleware',
        })
    }
}
