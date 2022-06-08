
class Form {
  #index;
  constructor(fields) {
    this.fields = fields;
    this.#index = 0;
    this.currentField = fields[this.#index];
  }

  nextField() {
    this.#index++;
    this.currentField = this.fields[this.#index];
  }

  isFilled() {
    return this.fields.every(field => field.isFilled());
  }

  currentQuestion() {
    console.log(this.currentField.msg);
  }

  fillCurrentField(reply) {
    if (this.currentField.validator(reply)) {
      this.currentField.fill(this.currentField.parser(reply));
      this.nextField();
      return;
    }
    console.log('Invalid input');
  }

  getAnswers() {
    const replies = {};
    this.fields.forEach(field => {
      replies[field.key] = field.getReply();
    });
    return replies;
  }
}

exports.Form = Form;
