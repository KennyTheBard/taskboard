const Router = require('express')();

const { extractPathParam } = require('../middleware/extract.js');

const BoardController = require('../models/board/controllers.js');
const ListsController = require('../models/list/controllers.js');
const CardsController = require('../models/card/controllers.js');

Router.use('/board', BoardController);
Router.use('/:boardId/list', extractPathParam('boardId'), ListsController);
Router.use('/:listId/card', extractPathParam('listId'), CardsController);


module.exports = Router;