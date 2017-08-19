const Condition = require('./Condition');
const Food = require('./Food');

class YakitoriClassifier {
  constructor() {
    this.FOOD_NAME_MAP = {
      [Food.Momo]: 'もも',
      [Food.Sasami]: 'ささみ',
      [Food.Negi]: 'ねぎ',
      [Food.Nankotsu]: 'なんこつ',
      [Food.Tsukune]: 'つくね',
      [Food.Heart]: 'はぁと',
      [Food.Liver]: 'レバー',
    };
    this.MIXED_FOOD_NAME_MAP = {
      Negima: 'ねぎま'
    };
    this.MAX_FOOD_NUM = 5;
    this.FOOD_NAME_REGEXP = new RegExp(`${Object.values(this.FOOD_NAME_MAP).join('|')}`, 'g');
    this.MIXED_FOOD_NAME_REGEXP = new RegExp(`${Object.values(this.MIXED_FOOD_NAME_MAP).join('|')}`, 'g');
  }

  isEatable(name) {
    return '' === name.replace(this.MIXED_FOOD_NAME_REGEXP, '').replace(this.FOOD_NAME_REGEXP, '');
  }

  /**
   * 素材から名前を決定して返します。
   * @param {{name: string, condition: string}[]} foods
   * @returns {string|null}
   */
  classify(foods) {
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
  countFoods(foods) {
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

  generateNumPrefix(foods) {
    if (foods.length === this.MAX_FOOD_NUM) {
      return '';
    }
    if (0 < foods.length && foods.length < this.MAX_FOOD_NUM) {
      return '少なめの';
    }
    return '';
  }

  generateConditionPrefix(count) {
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

  generateName(foods, count) {
    const names = count['name'];
    switch (names.length) {
      case 1: {
        return this.FOOD_NAME_MAP[names[0]['key']];
      }
      case 2: {
        if (
          names[0]['key'] === Food.Momo && names[1]['key'] === Food.Negi ||
          names[0]['key'] === Food.Negi && names[1]['key'] === Food.Momo
        ) {
          return this.MIXED_FOOD_NAME_MAP.Negima;
        }
        return `${this.FOOD_NAME_MAP[names[0]['key']]}${this.FOOD_NAME_MAP[names[1]['key']]}`
      }
    }
    return 'ミックス';
  }
}

module.exports = new YakitoriClassifier;
