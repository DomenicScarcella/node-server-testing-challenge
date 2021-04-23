const db = require('../data/db-config.js');

async function addLetter(letter) {
    const [id] = await db('letters').insert(letter);
    return db('letters').where('id', id).first();
}




module.exports = { addLetter };