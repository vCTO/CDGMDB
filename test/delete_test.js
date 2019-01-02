const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({
      name: 'Joe'
    });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({
        name: 'Joe'
      }))
      .then((user) => {
        assert(user === null);
        console.log("instance remove worked")
        done();
      });
  });

  it('class method remove', (done) => {
    User.deleteMany({
        name: 'Joe'
      })
      .then(() => User.findOne({
        name: 'Joe'
      }))
      .then((user) => {
        assert(user === null);
        console.log("deleteMany worked");
        done();
      });
  });

  it('class method findOneAndDelete', (done) => {
    User.findOneAndDelete({
        name: 'Joe'
      })
      .then(() => User.findOne({
        name: 'Joe'
      }))
      .then((user) => {
        assert(user === null);
        console.log("findOneAndDelete worked");
        done();
      });
  });

  it('class method findByIdAndDelete', (done) => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({
        name: 'Joe'
      }))
      .then((user) => {
        assert(user === null);
        console.log("findByIdAndDelete worked");
        done();
      });
  });

});
