
class Form {
  #index;
  constructor(fields) {
    this.fields = fields;
    this.#index = 0;
    this.current = fields[this.#index];
    this.answers = {};
  }

  next() {
    this.#index++;
    if (this.isQuestionsFinished()) {
      return;
    }
    this.current = this.fields[this.#index];
  }

  isQuestionsFinished() {
    return this.#index >= this.fields.length;
  }

  question() {
    console.log(this.current.msg);
  }

  answer(reply) {
    if (this.current.validator(reply)) {
      const prevReply = this.answers[this.current.key];
      this.answers[this.current.key] = this.current.parser(reply, prevReply);
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
