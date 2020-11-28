const express = require('express');

const CardService = require('./services');

const {
    validateFields
} = require('../../utils');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const {
        listId,
        description,
        name
    } = req.body;

    try {
        validateFields({
            listId: {
                value: listId,
                type: 'int'
            },
            description: {
                value: description,
                type: 'ascii'
            },
            name: {
                value: name,
                type: 'ascii'
            },
        });

        await CardService.add(name, description, parseInt(listId));
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    const {
        listId
    } = req.state;

    try {
        validateFields({
            project_id: {
                value: listId,
                type: 'int'
            },
        });

        const tasks = await CardService.getAllByList(parseInt(projectId));
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        description,
        name
    } = req.body;

    try {
        validateFields({
            id: {
                value: id,
                type: 'int'
            },
            description: {
                value: description,
                type: 'ascii'
            },
            name: {
                value: name,
                type: 'ascii'
            },
        });

        await CardService.updateById(parseInt(id), name, description);
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

        await CardService.deleteById(parseInt(id), parseInt(projectId));
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;