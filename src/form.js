const fs = require('fs');

class Form {
  constructor() {
    this.questions = ['name', 'DOB', 'hobbies',
      'phone number', 'address line 1', 'address line 2'];
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

  addPhone(number) {
    if (validatePhone(number)) {
      this.phone = number;
      return true;
    }
    return false;
  }

  addHobbies(hobbies) {
    if (!isEmpty(hobbies)) {
      this.hobbies = hobbies.split(',');
      return true;
    }
    return false;
  }

  addAddressLine1(line1) {
    this.address = this.address || [];
    if (!isEmpty(line1)) {
      this.address.push(line1);
      return true;
    }
    return false;
  }

  addAddressLine2(line2) {
    if (!isEmpty(line2)) {
      this.address.push(line2);
      return true;
    }
    return false;
  }

  question() {
    const something = this.questions[this.current];
    console.log('Please enter your ' + something + ': ');
  }

  getDetails() {
    return {
      name: this.name, DOB: this.DOB, hobbies: this.hobbies,
      phone: this.phone, address: this.address.join('\n')
    };
  }

}

const validateName = name => name.length > 4;

const validatePhone = (number) => {
  return isFinite(number) && ('' + number).length === 10;
};

const validateDOB = (DOB) => {
  const validFormat = DOB.length === 10 && DOB.includes('-');
  return DOB.split('-').filter((number) => {
    return isFinite(number) && validFormat;
  }).length === 3;
};

const isEmpty = text => text === '';

const write = (json) => {
  console.log('Thank you');
  fs.writeFileSync('form.json', json, 'utf-8');
  process.exit(0);
};

const main = () => {
  const form = new Form();
  form.question();
  const methods = ['addName', 'addDOB', 'addHobbies',
    'addPhone', 'addAddressLine1', 'addAddressLine2'];
  let index = 0;
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    const method = methods[index];
    const data = chunk.trim();
    if (form[method](data)) {
      form.next();
      index++;
      if (index === methods.length) {
        write(JSON.stringify(form.getDetails()));
      }
    }
    form.question();
  });
};

main();
