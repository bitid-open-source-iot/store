var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.put('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.products.get(req, res);
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.products.add(req, res);
});

router.put('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.products.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.products.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.products.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.products.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.products.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.products.updatesubscriber(req, res);
});

module.exports = router;