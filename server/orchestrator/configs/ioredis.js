const Redis = require("ioredis");
const redis = new Redis({
  host: 'redis-10736.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 10736,
  password: 'Hayk9OqpFJz7f35Yd1eZLlWnIvwEW21A'
})

module.exports = redis;