const {getAll, getById, create, update, remove} = require('./controller');
const {handleErrors} = require('../errors')
const express = require('express');
const router = express.Router();

router.get('/', handleErrors(getAll));
router.post('/', handleErrors(create));
router.get('/:id', handleErrors(getById));
router.put('/:id', handleErrors(update));
router.delete('/:id', handleErrors(remove));

module.exports = router;