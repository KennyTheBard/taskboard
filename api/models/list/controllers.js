const express = require('express');

const ListService = require('./services');

const {
    validateFields
} = require('../../utils');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {
        boardId,
    } = req.state;
    const {
        name,
    } = req.body;

    try {
        validateFields({
            boardId: {
                value: boardId,
                type: 'int'
            },
            name: {
                value: name,
                type: 'ascii'
            },
        });

        await ListService.add(name, parseInt(boardId));
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    const {
        boardId
    } = req.state;

    try {
        validateFields({
            boardId: {
                value: boardId,
                type: 'int'
            },
        });

        const lists = await ListService.getAllByBoard(parseInt(boardId));
        res.json(lists);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
    } = req.body;

    try {
        validateFields({
            id: {
                value: id,
                type: 'int'
            },
            name: {
                value: name,
                type: 'ascii'
            },
        });

        await ListService.updateById(parseInt(id), name);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        validateFields({
            id: {
                value: id,
                type: 'int'
            }
        });

        await ListService.deleteById(parseInt(id));
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;