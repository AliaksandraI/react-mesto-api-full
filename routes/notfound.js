const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports = router;
