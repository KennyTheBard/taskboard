const {
    query
} = require('../../data');

const add = async (name) => {
    await query('INSERT INTO boards (name) ' +
    'VALUES ($1)', [name]);
};

const getAll = async () => {
    return await query('SELECT * FROM boards');
};

const updateById = async (id, name) => {
    await query('UPDATE boards SET name = $2 WHERE id = $1', [id, name]);
};

const deleteById = async (id) => {
    await query('DELETE FROM boards WHERE id = $1', [id]);
};


module.exports = {
    add,
    getAll,
    updateById,
    deleteById
}