const redis = require('redis');

class YakitoriRedis {
  get YAKITORI_KEY_PREFIX() { return 'yakitori_'; }
  get YAKITORI_LIST_KEY() { return 'list'; }

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

  list() {
    return new Promise((resolve, reject) => {
      this.client.keys(`${this.YAKITORI_KEY_PREFIX}*`, (error, keys) => {
        if (error) {
          reject(error);
        }
        this.client.mget(keys, (error, values) => {
          if (error) {
            reject(error);
          }
          const result = keys.map((key, index) => {
            return {
              name: key.replace(this.YAKITORI_KEY_PREFIX, ''),
              num: parseInt(values[index], 10)
            };
          });
          resolve(result);
        });
      });
    });
  }

  setList(list) {
    return new Promise((resolve, reject) => {
      try {
        this.client.set(this.YAKITORI_LIST_KEY, JSON.stringify(list), (error) => {
          if (error) {
            reject(error);
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new YakitoriRedis();
