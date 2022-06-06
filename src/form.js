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
    if (validateName(name)) {
      this.name = name;
      return true;
    }
    return false;
  }

  addDOB(DOB) {
    if (validateDOB(DOB)) {
      this.DOB = DOB;
      return true;
    }
    return false;
  }

  addHobbies(hobbies) {
    if (validateHobbies(hobbies)) {
      this.hobbies = hobbies.split(',');
      return true;
    }
    return false;
  }

  question() {
    const something = this.questions[this.current];
    console.log('Please enter your ' + something + ': ');
  }

  getDetails() {
    return { name: this.name, DOB: this.DOB, hobbies: this.hobbies };
  }

}

const validateName = (name) => name.length > 4;

const validateDOB = (DOB) => DOB.length === 10;

const validateHobbies = (hobbies) => hobbies.length !== 0;

const write = (json) => {
  console.log('Thank you');
  fs.writeFileSync('form.json', json, 'utf-8');
  process.exit(0);
};

const main = () => {
  const form = new Form();
  form.question();
  const questions = [form.addName, form.addDOB, form.addHobbies];
  let index = 0;
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    console.log(form.getDetails());
    if (questions[index](chunk.slice(0, -1))) {
      form.next();
      index++;
      if (index === questions.length) {
        write(JSON.stringify(form.getDetails()));
      }
    }
    form.question();
  });
};

main();
