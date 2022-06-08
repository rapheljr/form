const fs = require('fs');
const { Form } = require('./form.js');
const { Field } = require('./field.js');
const { MultiLineField } = require('./multiLineField.js');

const write = JSON => {
  console.log('Thank you');
  fs.writeFileSync('form.json', JSON, 'utf-8');
  process.exit(0);
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
    new Field('phone-number', 'Please enter your phone number:',
      validatePhone),
    new MultiLineField('address', addressMsgs, isNotEmpty),
  ];
  return fields;
};

const fillField = (form, reply) => {
  try {
    form.fillCurrentField(reply);
  } catch (error) {
    console.log(error);
  }
  if (form.isFilled()) {
    const answers = form.getAnswers();
    write(JSON.stringify(answers));
  }
  console.log(form.currentQuestion());
};

const main = () => {
  const form = new Form(getFields());
  console.log(form.currentQuestion());
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    fillField(form, chunk.trim());
  });
};

main();
