const express = require('express');
const router = express.Router();

const controller = require('./good.controller');


router.get('/:no', controller.selectAll);


router.get('/get/:no', controller.selectOne);


router.post('/', controller.add);


router.put('/', controller.update);


router.delete('/:no', controller.del);

module.exports = router;