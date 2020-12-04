const express = require('express');

const BoardService = require('./services');


const {
    validateFields
} = require('../../utils');


const router = express.Router();

router.post('/', async (req, res, next) => {
    const {
        name
    } = req.body;

    try {
        validateFields({
            name: {
                value: name,
                type: 'ascii'
            },
        });

        await BoardService.add(name);
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const boards = await BoardService.getAll();
        res.json(boards);
    } catch (err) {
        next(err);
    }
});

router.get('/:boardId', async (req, res, next) => {
    const {
        boardId
    } = req.params;

    try {
        validateFields({
            boardId: {
                value: boardId,
                type: 'int'
            }
        });

        const boards = await BoardService.getById(boardId);
        res.json(boards);
    } catch (err) {
        next(err);
    }
});

router.put('/:boardId', async (req, res, next) => {
    const {
        boardId
    } = req.params;
    const {
        name
    } = req.body;

    try {
        validateFields({
            boardId: {
                value: boardId,
                type: 'int'
            },
            status: {
                value: name,
                type: 'ascii'
            },
        });

        await BoardService.updateById(parseInt(boardId), name);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:boardId', async (req, res, next) => {
    const {
        boardId
    } = req.params;

    try {
        validateFields({
            boardId: {
                value: boardId,
                type: 'int'
            }
        });

        await BoardService.deleteById(parseInt(boardId));
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;