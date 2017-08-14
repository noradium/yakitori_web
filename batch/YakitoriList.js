const CronJob = require('cron').CronJob;
const YakitoriRedis = require('../infra/YakitoriRedis');
const YakitoriClassifier = require('../model/YakitoriClassifier');

module.exports = function start() {
  const job = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: () => {
      YakitoriRedis.list()
        .then((list) => {
          return list.sort((a, b) => {
            return a.num < b.num;
          });
        })
        .then((sortedList) => {
          const savingList = sortedList.map((item) => {
            item.isEatable = YakitoriClassifier.isEatable(item.name);
            return item;
          });
          return YakitoriRedis.setList(savingList);
        })
        .catch((error) => {
          console.error('YakitoriList batch failed', error);
        });
    },
    start: false
  });
  job.start();
};
