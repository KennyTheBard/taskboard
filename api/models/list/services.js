const {
    query
} = require('../../data');

const add = async (name, board_id) => {
    await query('INSERT INTO lists (name, board_id) ' +
    'VALUES ($1, $2)', [name, board_id]);
};

const getAllByBoard = async (board_id) => {
    return await query('SELECT * FROM lists WHERE board_id = $1', [board_id]);
};

const updateById = async (id, name) => {
    await query('UPDATE lists SET name = $2 WHERE id = $1', [id, name]);
};

const deleteById = async (id) => {
    await query('DELETE FROM lists WHERE id = $1', [id]);
};


module.exports = {
    add,
    getAllByBoard,
    updateById,
    deleteById
}