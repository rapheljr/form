const fs = require('fs');
const { Form } = require('./form.js');

const write = (JSON) => {
  console.log('Thank you');
  fs.writeFileSync('form.json', JSON, 'utf-8');
  process.exit(0);
};

const validateDOB = (DOB) => {
  const validFormat = DOB.length === 10 && DOB[4] === '-' && DOB[7] === '-';
  return DOB.split('-').filter((number) => {
    return isFinite(number) && validFormat;
  }).length === 3;
};

const isNotEmpty = text => text !== '';

const validateName = name => name.length > 4;

const validatePhone = (number) => {
  return isFinite(number) && ('' + number).length === 10;
};

const identity = id => id;

const splitter = content => content.split(',');

const getQuestions = () => {
  const questions = [
    { query: 'name', validator: validateName, parser: identity },
    { query: 'DOB', validator: validateDOB, parser: identity },
    { query: 'hobbies', validator: isNotEmpty, parser: splitter },
    { query: 'phone-number', validator: validatePhone, parser: identity },
    { query: 'address-line-1', validator: isNotEmpty, parser: identity },
    { query: 'address-line-2', validator: isNotEmpty, parser: identity },
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
