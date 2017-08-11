const redis = require('redis');

class YakitoriRedis {
  get YAKITORI_KEY_PREFIX() { return 'yakitori_'; }

  constructor() {
    this.client = redis.createClient();
  }

  increment(name) {
    return new Promise((resolve, reject) => {
      this.client.incr(`${this.YAKITORI_KEY_PREFIX}${name}`, (error, num) => {
        if (error) {
          reject(error);
        }
        resolve(num);
      });
    });
  }
}

module.exports = new YakitoriRedis();
