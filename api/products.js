const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.products.get(req, res);
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.products.add(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.products.list(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.products.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.products.delete(req, res);
});

module.exports = router;