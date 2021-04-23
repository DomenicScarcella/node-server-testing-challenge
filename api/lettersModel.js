const db = require('../data/db-config.js');

async function addLetter(letter) {
    const [id] = await db('letters').insert(letter);
    return db('letters').where('id', id).first();
}

async function deleteLetter(id) {
    const letter = await db('letters').where('id', id).first();
    await db('letters').where('id', id).del();
    return letter;
}


module.exports = { addLetter, deleteLetter };