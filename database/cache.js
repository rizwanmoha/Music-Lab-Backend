const Redis = require('ioredis');

// const redisClient = new Redis({
//     host: process.env.REDIS_SERVER || 'rediss://red-copaa6i1hbls7385adug:vsf6P9dRJphFLBt5rdu0PGcOlGROxAnI@frankfurt-redis.render.com:6379', // Redis server address //Convert this to 127.0.0.1 if not using docker
//     port: 6379,        // Redis server port
//   });

  const redisClient = new Redis({
    username: "red-copaa6i1hbls7385adug", // Render Redis name, red-xxxxxxxxxxxxxxxxxxxx
    host: "frankfurt-redis.render.com",             // Render Redis hostname, REGION-redis.render.com
    password: process.env.REDIS_PASSWORD,     // Provided password
    port: process.env.REDIS_PORT || 6379,     // Connection port
    tls: true, // TLS required when externally connecting to Render Redis
  });
  
exports.redisClient = redisClient;
  