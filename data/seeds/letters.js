exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries and resets ids
    return knex('letters')
      .truncate()
      .then(function() {
        return knex('letters').insert([
          { letter: 'A' },
          { letter: 'B' },
          { letter: 'C' },
        ]);
      });
  };