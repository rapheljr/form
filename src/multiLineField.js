class MultiLineField {
  constructor(key, msgs, validator = () => true, parser = x => x) {
    this.key = key;
    this.msgs = msgs;
    this.validator = validator;
    this.parser = parser;
    this.replies = [];
  }

  fill(reply) {
    this.replies.push(reply);
  }

  getMsg() {
    const msg = this.replies.length;
    return this.msgs[msg];
  }

  isFilled() {
    return this.replies.length === this.msgs.length;
  }

  getReply() {
    return this.replies.join('\n');
  }
}

exports.MultiLineField = MultiLineField;
