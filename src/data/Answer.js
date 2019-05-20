
class Answer {
  constructor() {
    this._easy = { true: 0, false: 0, incorrectAnswer: [] };
    this._medium = { true: 0, false: 0, incorrectAnswer: [] };
    this._hard = { true: 0, false: 0, incorrectAnswer: [] };
  }

  get easy() {
    return this._easy;
  }

  get medium() {
    return this._medium;
  }

  get hard() {
    return this._hard;
  }

  addAnswer(type, isTrue, number) {
    if (isTrue) {
      this[`_${type}`].true += 1;
    } else {
      this[`_${type}`].false += 1;
      this[`_${type}`].incorrectAnswer.push(number);
    }
  }

  getTrueAnswers() {
    return this._easy.true + this._medium.true + this.hard.true;
  }
}

export default Answer;
