const {
    query
} = require('../../data');

const add = async (name, description, list_id) => {
    await query('INSERT INTO cards (name, description, list_id) ' +
    'VALUES ($1, $2, $3)', [name, description, list_id]);
};

const getAllByList = async (list_id) => {
    return await query('SELECT * FROM cards WHERE list_id = $1', [list_id]);
};

const updateById = async (id, name, description) => {
    await query('UPDATE cards SET name = $2, description = $3 WHERE id = $1', [id, name, description]);
};

const updateListId = async (id, listId) => {
    await query('UPDATE cards SET list_id = $2 WHERE id = $1', [id, listId]);
};

const deleteById = async (id) => {
    await query('DELETE FROM cards WHERE id = $1', [id]);
};


module.exports = {
    add,
    getAllByList,
    updateById,
    updateListId,
    deleteById
}