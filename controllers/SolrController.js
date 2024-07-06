const solr = require("solr-client");



const client = new solr.createClient({
  host: 'localhost',
  port: '8983',
  core: 'courses',
  path: '/solr/courses'
});


exports.solrsearch = async(req , res) =>{
    try{
        const searchQuery = req.query.search;
         client.search(searchQuery, (err, result) => {
      if (err) {
        return res.status(500).send({ success: false, message: 'Error searching courses' });
      }

      const courses = result.response.docs;
      return res.status(200).send({ success: true, message: 'List of courses', courses });
    });
    }
    catch(error){
        return res.status(200).send({ success: false, message: 'Error while solrsearch' });
    }
}