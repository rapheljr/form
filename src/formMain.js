const fs = require('fs');
const { Form } = require('./form.js');
const { Field } = require('./field.js');

const write = JSON => {
  console.log('Thank you');
  fs.writeFileSync('form.json', JSON, 'utf-8');
  process.exit(0);
};

const validateDOB = DOB => DOB.match(/^\d{4}-\d{2}-\d{2}$/);

const isNotEmpty = text => text !== '';

const validateName = name => name.length > 4;

const validatePhone = number => number.match(/^\d{10}$/);

const prepend = (arg1, arg2) => {
  if (arg2) {
    return arg2 + '\n' + arg1;
  }
  return arg1;
};

const commaSplit = content => content.split(',');

const getFields = () => {
  const fields = [
    new Field('name', 'Please enter your name:', validateName),
    new Field('DOB', 'Please enter your DOB:', validateDOB),
    new Field('hobbies', 'Please enter your hobbies:', isNotEmpty, commaSplit),
    new Field('phone-number', 'Please enter your phone number:',
      validatePhone),
    new Field('address', 'Please enter your address line 1:',
      isNotEmpty, prepend),
  ];
  return fields;
};

const fillField = (form, reply) => {
  form.fillCurrentField(reply);
  if (form.isFilled()) {
    const answers = form.getAnswers();
    write(JSON.stringify(answers));
  }
  form.currentQuestion();
};

const main = () => {
  const form = new Form(getFields());
  form.currentQuestion();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    fillField(form, chunk.trim());
  });
};

main();
