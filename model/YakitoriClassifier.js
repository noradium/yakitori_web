const Condition = require('./Condition');
const Food = require('./Food');

class YakitoriClassifier {
  static get FOOD_NAME_MAP() {
    return {
      [Food.Momo]: 'モモ'
    };
  }
  static get MIXED_FOOD_NAME_MAP() {
    return {
    };
  }
  static get MAX_FOOD_NUM() { return 5;}

  static isEatable(name) {
    if (Object.values(YakitoriClassifier.FOOD_NAME_MAP).includes(name)) {
      return true;
    }
    if (Object.values(YakitoriClassifier.MIXED_FOOD_NAME_MAP).includes(name)) {
      return true;
    }
    return false;
  }

  /**
   * 素材から名前を決定して返します。
   * @param {{name: string, condition: string}[]} foods
   * @returns {string|null}
   */
  static classify(foods) {
    if (!foods || !Array.isArray(foods) || foods.length > this.MAX_FOOD_NUM) {
      return null;
    }
    if (foods.length === 0) {
      return 'ただの串';
    }

    const count = this.countFoods(foods);
    const name = this.generateName(foods, count);
    if (!name) {
      return null;
    }

    const numPrefix = this.generateNumPrefix(foods);
    const conditionPrefix = this.generateConditionPrefix(count);

    return `${numPrefix}${conditionPrefix}${name}`;
  }

  /**
   * @param {{name: string, condition: string}[]} foods
   */
  static countFoods(foods) {
    const counter = {};

    foods.forEach((food) => {
      Object.keys(food).forEach((key) => {
        if (!counter[key]) {
          counter[key] = {};
        }
        if (counter[key][food[key]]) {
          counter[key][food[key]]++;
        } else {
          counter[key][food[key]] = 1;
        }
      });
    });

    const result = {};
    Object.keys(counter)
      .forEach((key) => {
        result[key] = Object.keys(counter[key])
          .map((key2) => {
            return {
              key: key2,
              value: counter[key][key2]
            };
          })
          .sort((a, b) => b.value - a.value);
      });
    return result;
  }

  static generateNumPrefix(foods) {
    if (foods.length === this.MAX_FOOD_NUM) {
      return '';
    }
    if (0 < foods.length && foods.length < this.MAX_FOOD_NUM) {
      return '少なめの';
    }
    return '';
  }

  static generateConditionPrefix(count) {
    const conditions = count['condition'];
    switch (conditions.length) {
      case 1: {
        switch (conditions[0]['key']) {
          case Condition.Nama:
            return 'まだ生の';
          case Condition.Good:
            return '';
          case Condition.Koge:
            return '焦げた';
        }
      }
      case 2: {
        if (conditions[0]['key'] === Condition.Nama) {
          if (conditions[1]['key'] === Condition.Good) {
            return '焼き足りない';
          } else if (conditions[1]['key'] === Condition.Koge) {
            return '焼き加減が極端な';
          }
        } else if (conditions[0]['key'] === Condition.Good) {
          if (conditions[1]['key'] === Condition.Nama) {
            return 'ちょっと生の';
          } else if (conditions[1]['key'] === Condition.Koge) {
            return 'ちょっと焦げた';
          }
        } else if (conditions[0]['key'] === Condition.Koge) {
          if (conditions[1]['key'] === Condition.Nama) {
            return '焼き加減が極端な';
          } else if (conditions[1]['key'] === Condition.Good) {
            return '大分焦げた';
          }
        }
      }
      case 3: {
        return '焼き方を間違えた';
      }
    }
    return '';
  }

  static generateName(foods, count) {
    const names = count['name'];
    switch (names.length) {
      case 1: {
        return YakitoriClassifier.FOOD_NAME_MAP[names[0]['key']];
      }
    }
    return null;
  }
}

module.exports = YakitoriClassifier;
