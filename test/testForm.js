const assert = require('assert');
const { form } = require('../src/form.js');

describe('form', () => {
  it('message', () => {
    assert.deepStrictEqual(form('args'), 'args');
  });
});
