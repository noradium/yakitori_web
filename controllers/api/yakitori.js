const express = require('express');
const router = express.Router();
const YakitoriClassifier = require('../../model/YakitoriClassifier');
const YakitoriRedis = require('../../infra/YakitoriRedis');

router.post('/', (req, res, next) => {
  const foods = req.body['foods'];
  if (!foods || !Array.isArray(foods) || foods.length > 5) {
    return error(res, 400, 'invalid foods');
  }

  const name = YakitoriClassifier.classify(foods);
  if (!name) {
    return error(res, 400, 'invalid foods');
  }

  YakitoriRedis.increment(name)
    .then((num) => {
      res.json({name: name, num: num});
    })
    .catch((error) => {
      error(res, 500, 'internal server error');
    });
});

function error(res, status, message) {
  res.status(status).json({
    status,
    message
  });
}

module.exports = router;
