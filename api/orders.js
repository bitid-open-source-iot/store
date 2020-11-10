const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.orders.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.orders.list(req, res);
});

router.post('/verify', (req, res) => {
    var myModule = new bll.module();
    myModule.orders.verify(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.orders.update(req, res);
});

router.post('/initialize', (req, res) => {
    var myModule = new bll.module();
    myModule.orders.initialize(req, res);
});

module.exports = router;