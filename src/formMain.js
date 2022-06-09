const { Field } = require('./field.js');
const { MultiLineField } = require('./multiLineField.js');

const write = (JSON, logger, writer) => {
  logger('Thank you');
  writer('form.json', JSON, 'utf-8');
  process.stdin.destroy();
};

const validateDOB = DOB => DOB.match(/^\d{4}-\d{2}-\d{2}$/);

const isNotEmpty = text => text !== '';

const validateName = name => name.length > 4;

const validatePhone = number => number.match(/^\d{10}$/);

const commaSplit = content => content.split(',');

const getFields = () => {
  const addressMsgs = ['Please enter your address line 1:',
    'Please enter your address line 2:'];
  const fields = [
    new Field('name', 'Please enter your name:', validateName),
    new Field('DOB', 'Please enter your DOB:', validateDOB),
    new Field('hobbies', 'Please enter your hobbies:', isNotEmpty, commaSplit),
    new Field('phone-number', 'Please enter your phone number:', validatePhone),
    new MultiLineField('address', addressMsgs, isNotEmpty),
  ];
  return fields;
};

const fillField = (form, reply, logger, writer) => {
  try {
    form.fillCurrentField(reply);
  } catch (error) {
    logger(error.message);
  }
  if (form.isFilled()) {
    const answers = form.getAnswers();
    write(JSON.stringify(answers), logger, writer);
    return;
  }
  logger(form.currentQuestion());
};

const format = chunk => chunk.trim().split('\n');

module.exports = { fillField, getFields, format };
