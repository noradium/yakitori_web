const CronJob = require('cron').CronJob;
const YakitoriRedis = require('../infra/YakitoriRedis');

module.exports = function start() {
  var job = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: function() {
      YakitoriRedis.list()
        .then((list) => {
          return list.sort((a, b) => {
            if (a.num === b.num) {
              return a.name.length < b.name.length;
            }
            return a.num < b.num;
          });
        })
        .then((sortedList) => {
          return YakitoriRedis.setList(sortedList);
        })
        .catch((error) => {
          console.error('YakitoriList batch failed', error);
        });
    },
    start: false
  });
  job.start();
};
