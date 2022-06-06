const fs = require('fs');

class Form {
  constructor() {
    this.questions = ['name', 'DOB', 'hobbies'];
    this.current = 0;
  }
  next() {
    this.current++;
  }
  addName(name) {
    this.name = name;
  }
  addDOB(DOB) {
    this.DOB = DOB;
  }
  addHobbies(hobbies) {
    this.hobbies = hobbies;
  }
  question() {
    const something = this.questions[this.current];
    console.log('Please enter your ' + something + ': ');
  }
  getDetails() {
    return { name: this.name, DOB: this.DOB, hobbies: this.hobbies };
  }
}

const question = (something) => {
  console.log('Please enter your ' + something + ': ');
};

const format = (detail, chunk) => {
  let data = chunk.slice(0, -1);
  if (detail === 'hobbies') {
    data = chunk.slice(0, -1).split(',');
  }
  return data;
};

const write = (json) => {
  console.log('Thank you');
  fs.writeFileSync('form.json', json, 'utf-8');
  process.exit(0);
};

const main = () => {
  const form = {};
  const details = ['name', 'DOB', 'hobbies'];
  let index = 0;
  question(details[index]);
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    const data = format(details[index], chunk);
    form[details[index]] = data;
    index++;
    if (index === details.length) {
      write(JSON.stringify(form));
    }
    question(details[index]);
  });
};

main();
