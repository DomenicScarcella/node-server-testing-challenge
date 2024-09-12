const request = require('supertest');
const db = require('../data/db-config.js');
const server = require('../server.js');
const Model = require('./lettersModel.js');

const letterD = { position: '4th', letter: 'D' };
const letterE = { position: '5th', letter: 'E' };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('letters').truncate();
});

afterAll(async () => {
    await db.destroy();
});

it('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('lettersModel functions', () => {
    describe('add letter', () => {

        test('adds letter to table', async () => {
            let letters;
            await Model.addLetter(letterD);
            letters = await db('letters');
            expect(letters).toHaveLength(1);

            await Model.addLetter(letterE);
            letters = await db('letters');
            expect(letters).toHaveLength(2);
        });

        test('inserted position and letter', async () => {
            const letter = await Model.addLetter(letterD);
            expect(letter).toMatchObject({ id: 1, ...letter });
        });
    });

    describe('[DELETE] / - delete letter', () => {

        test('removes letter from db', async () => {
            const [id] = await db('letters').insert(letterD);
            let letter = await db('letters').where({ id }).first();
            expect(letter).toBeTruthy();
            await request(server).delete('/letters/'+ id);
            letter = await db('letters').where({ id }).first();
            expect(letter).toBeFalsy();
            
        });

        test('respond with deleted letter', async () => {
            await db('letters').insert(letterD);
            let letter = await request(server).delete('/letters/1');
            expect(letter.body).toMatchObject(letterD);
        });
    });
});


