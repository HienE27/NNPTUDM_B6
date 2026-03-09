var express = require('express');
var router = express.Router();
/* GET home page. */
//localhost:3000
router.get('/', function (req, res, next) {
  res.json({ message: 'API v1', endpoints: ['/auth', '/users', '/roles', '/products', '/categories'] });
});

module.exports = router;
