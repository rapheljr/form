const fs = require('fs');
const assert = require('assert');
const { Field } = require('../src/field.js');
const { Form } = require('../src/form.js');
const { fillField } = require('../src/formMain.js');

describe('fillField', () => {
  it('should fill current field', () => {
    const field = new Field('name', '');
    const form = new Form(field);
    fillField(form, 'abin', console.log, fs.writeFileSync);
    assert.deepStrictEqual(form.getAnswers(), { name: 'abin' });
  });
});

describe('form', () => {
  it('should fill current field', () => {
    const field = new Field('name', '');
    const form = new Form(field);
    form.fillCurrentField('abin');
    assert.deepStrictEqual(form.getAnswers(), { name: 'abin' });
  });

  it('should say filled', () => {
    const field = new Field('name', '');
    const form = new Form(field);
    form.fillCurrentField('abin');
    assert.deepStrictEqual(form.isFilled(), true);
  });

  it('should say not filled', () => {
    const field = new Field('name', '');
    const form = new Form(field);
    assert.deepStrictEqual(form.isFilled(), false);
  });

  it('should say msg', () => {
    const field = new Field('name', 'msg');
    const form = new Form(field);
    assert.deepStrictEqual(form.currentQuestion(), 'msg');
  });
});

describe('field', () => {
  it('should fill current field', () => {
    const field = new Field('name', '');
    field.fill('abin');
    assert.deepStrictEqual(field.getReply(), 'abin');
  });

  it('should say filled', () => {
    const field = new Field('name', '');
    field.fill('abin');
    assert.deepStrictEqual(field.isFilled(), true);
  });

  it('should say not filled', () => {
    const field = new Field('name', '');
    assert.deepStrictEqual(field.isFilled(), false);
  });

  it('should say msg', () => {
    const field = new Field('name', 'msg');
    assert.deepStrictEqual(field.getMsg(), 'msg');
  });
});
