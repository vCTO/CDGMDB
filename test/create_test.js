const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
  it('save a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save()
      .then(() => {
        // Has Joe been saved successfully?
        assert(!joe.isNew);
        done();
      });
  });
});
