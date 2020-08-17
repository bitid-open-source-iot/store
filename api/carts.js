var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
  	next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.carts.add(req, res);
});

router.post('/sync', (req, res) => {
    var myModule = new bll.module();
    myModule.carts.sync(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.carts.list(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.carts.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.carts.delete(req, res);
});

module.exports = router;