'use strict';

process.env.NODE_ENV = 'test';


const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');


suite('Part 4: User should be able to access the site from the browser.', () => {

  test('GET /index.html', (done) => {
    /* eslint-disable max-len */
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);

      /* eslint-enable max-len */
  });

});
