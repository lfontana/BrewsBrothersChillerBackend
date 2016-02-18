
exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then(function(){
  return knex('beers').del();
}).then(function(){
  return knex('batches').del();
}).then(function(){
    return Promise.all([
    knex('users').insert({
      pi_id: 'something',
      email: 'sample@gmail.com',
    }),
  ]);
}).then(function(){
  return Promise.all([
    knex('beers').insert({style: 'Ale'}),
    knex('beers').insert({style: 'Porter'}),
    knex('beers').insert({style: 'Stout'}),
    knex('beers').insert({style: 'Lager'}),
  ]);
})
// .then(function(){
//   return Promise.all([
//     knex('batches').insert({
//       user_id: 1,
//       beer_id: 1,
//       name: 'first brew',
//     })
//   ]);
// })
};
