
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([{
      	id:1,
        	name:'Criminal',
        	message:'What Are You?'
      },{
      	id:2,
          name:'Batman',
          message:'I\'m Batman'
      }]);
    });
};
