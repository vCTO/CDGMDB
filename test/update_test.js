const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe',
      postCount: 0
    });
    joe.save()
      .then(() => done());
  });


  function assertName(operation, done, msg) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        console.log(msg);
        done();
      });
  }

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done, 'set and save worked');

  });

  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done, 'model instance update worked');
  });

  it('A model class can update', (done) => {
    assertName(
      User.updateMany({ name: 'Joe' }, { name: 'Alex' }),
      done, 'model class update worked'
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done, 'model class find one and update worked'
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done, 'find by Id and update worked'
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.updateOne({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        console.log('user postCount increment worked');
        done();
      });
  });

});
