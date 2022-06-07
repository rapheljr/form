const fs = require('fs');
const { Form } = require('./form.js');

const write = JSON => {
  console.log('Thank you');
  fs.writeFileSync('form.json', JSON, 'utf-8');
  process.exit(0);
};

const validateDOB = DOB => {
  const validFormat = DOB.length === 10 && DOB[4] === '-' && DOB[7] === '-';
  return DOB.split('-').filter((number) => {
    return isFinite(number) && validFormat;
  }).length === 3;
};

const isNotEmpty = text => text !== '';

const validateName = name => name.length > 4;

const validatePhone = number => {
  return isFinite(number) && ('' + number).length === 10;
};

const identity = id => id;

const splitter = content => content.split(',');

const getQuestions = () => {
  const questions = [
    {
      key: 'name', msg: 'Please enter your name:',
      validator: validateName, parser: identity
    },
    {
      key: 'DOB', msg: 'Please enter your DOB(YYYY-MM-DD):',
      validator: validateDOB, parser: identity
    },
    {
      key: 'hobbies', msg: 'Please enter your hobbies:',
      validator: isNotEmpty, parser: splitter
    },
    {
      key: 'phone-number', msg: 'Please enter your phone number:',
      validator: validatePhone, parser: identity
    },
    {
      key: 'address-line-1', msg: 'Please enter your address line 1:',
      validator: isNotEmpty, parser: identity
    },
    {
      key: 'address-line-2', msg: 'Please enter your address line 2:',
      validator: isNotEmpty, parser: identity
    },
  ];
  return questions;
};

const main = () => {
  const form = new Form(getQuestions());
  form.question();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    const data = chunk.trim();
    form.answer(data);
    if (form.isQuestionsFinished()) {
      const answers = form.getAnswers();
      write(JSON.stringify(answers));
    }
    form.question();
  });
};

main();
