
'use strict';

const express = require('express');
const knex = require('../knex')
const router = express.Router();

// YOUR CODE HERE
router.get('/messages', (req, res, next) => {
  knex('messages')
    .select()
    .then((data) => {
      res.send(data)
    })
})

router.get('/messages/:id', (req, res, next) => {
  const id = req.params.id
  knex('messages')
    .select()
    .where('id', id)
    .then((message) => {
      res.send(message[0])
    })
})

router.post('/messages', (req, res, next) => {
  console.log(req.body)
  const {name, message} = req.body
  knex('messages')
    .insert({
      name: name,
      message: message
    }, '*')
    .then((row) => {
      res.send(row[0])
    })
})

router.patch('/messages/:id', (req, res, next) => {
  console.log(req.body)
  const {name, message} = req.body
  const id = req.params.id
  console.log(id)

  knex('messages')
    .select()
    .where('id', id)
    .then((row) => {
      let new_message = {
          name: name,
          message: message
      }
      return knex('messages')
        .update(new_message, '*')
        .where('id', id)
    })
    .then((message) => {
      res.send(message[0])
    })

})

router.delete('/messages/:id', (req, res, next) => {
  const id = req.params.id

  let message

  knex('messages')
    .where('id', id)
    .first()
    .then((row) => {
      message = row
      return knex('messages')
        .del()
        .where('id', id)
    })
    .then(() => {
      res.send(message)
    })
})

module.exports = router;
