const fs = require('fs');
const { Form } = require('./src/form.js');
const { getFields, format, fillField } = require('./src/formMain.js');

const main = () => {
  const form = new Form(...getFields());
  console.log(form.currentQuestion());
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (chunk) => {
    format(chunk).forEach(reply =>
      fillField(form, reply, console.log, fs.writeFileSync));
  });
};

main();
