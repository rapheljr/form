class Field {
  constructor(key, msg, validator = _ = true, parser = x = x) {
    this.key = key;
    this.msg = msg;
    this.validator = validator;
    this.parser = parser;
    this.reply = null;
  }
}

exports.Field = Field;
