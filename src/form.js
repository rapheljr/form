
class Form {
  #index;
  constructor(questions) {
    this.questions = questions;
    this.#index = 0;
    this.current = questions[this.#index];
    this.answers = {};
  }

  next() {
    this.#index++;
    if (this.#index >= this.questions.length) {
      return;
    }
    this.current = this.questions[this.#index];
  }

  isQuestionsFinished() {
    return this.#index >= this.questions.length;
  }

  question() {
    const query = this.current.query;
    console.log('Please enter your ' + query + ': ');
  }

  answer(reply) {
    if (this.current.validator(reply)) {
      this.answers[this.current.query] = this.current.parser(reply);
      this.next();
    }
  }

  getAnswers() {
    return this.answers;
  }
}

exports.Form = Form;
