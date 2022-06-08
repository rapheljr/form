const assert = require('assert');
const { Field } = require('../src/field.js');
const { Form } = require('../src/form.js');
const { fillField } = require('../src/formMain.js');

describe('form', () => {
  it('should fill current field', () => {
    const field = new Field('name', '');
    const form = new Form(field);
    fillField(form, 'abin');
    assert.deepStrictEqual(form.getAnswers(), { name: 'abin' });
  });
});
