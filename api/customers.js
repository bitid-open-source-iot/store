const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.customers.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.customers.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.customers.list(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.customers.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.customers.delete(req, res);
});

module.exports = router;