exports.seed = function (knex, Promise) {
  return knex('letters').truncate()
    .then(function () {
      return knex('letters').insert([
        { letter: 'A' },
        { letter: 'B' },
        { letter: 'C' },
      ]);
    });
};
