const fs = require('fs');

const question = (something) => {
  console.log('Please enter your ' + something + ': ');
};

const format = (type, chunk) => {
  let data = chunk.slice(0, -1);
  if (type === 'hobbies') {
    data = chunk.slice(0, -1).split(',');
  }
  return data;
};

const write = (json) => {
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
    if (index >= details.length) {
      write(JSON.stringify(form));
    }
    question(details[index]);
  });
};

main();
