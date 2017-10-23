'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const messages = require('./routes/messages');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(messages);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
