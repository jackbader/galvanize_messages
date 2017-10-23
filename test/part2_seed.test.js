/* eslint-disable camelcase */

'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');

suite('Part 2: Seed data for messages should be created.', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('messages table: seed data should match test data.', (done) => {
    knex('messages').orderBy('id', 'ASC')
      .then((actual) => {
        /* eslint-disable max-len */
        const expected = [{
          id:1,
          name:'Criminal',
          message:'What Are You?',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')

        },{
          id:2,
          name:'Batman',
          message:'I\'m Batman',
          created_at: new Date('2016-06-26 14:26:16 UTC'),
          updated_at: new Date('2016-06-26 14:26:16 UTC')
        }];

        /* eslint-enable max-len */

        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row where id=${i + 1} does not match.`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
