var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.addresses.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.addresses.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.addresses.list(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.addresses.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.addresses.delete(req, res);
});

module.exports = router;