
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
    if (this.isQuestionsFinished()) {
      return;
    }
    this.current = this.questions[this.#index];
  }

  isQuestionsFinished() {
    return this.#index >= this.questions.length;
  }

  question() {
    console.log(this.current.msg);
  }

  answer(reply) {
    if (this.current.validator(reply)) {
      this.answers[this.current.key] = this.current.parser(reply);
      this.next();
      return;
    }
    console.log('Invalid input');
  }

  getAnswers() {
    return this.answers;
  }
}

exports.Form = Form;
