const { redisClient } = require('../database/cache.js');
const teacherSchema = require('../models/teacher.js');

exports.InstructorDataController = async (req,res) => {
    
    try {

      redisClient.get("allTeachers", async (err, cachedData) => {
        if (err) throw err;
  
       if (cachedData) {
         return res.json(JSON.parse(cachedData));
      } else {

        const teacherData = await teacherSchema.find();
        console.log(teacherData )
    
        if (teacherData.length > 0) {
          res.status(200).json( teacherData );
          redisClient.setex("allTeachers", 3600, JSON.stringify(teacherData));
        } else {
          res.status(404).json({ error: "Teacher data not found" });
        }
      }
    })
      } catch (error) {
        console.error("error: " + error.message);
        res.status(500).json({ error: error.message });
      }

}