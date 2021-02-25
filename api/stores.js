const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.get(req, res);
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.add(req, res);
});

router.put('/load', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.load(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.delete(req, res);
});

router.put('/validate', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.validate(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.unsubscribe(req, res);
});

router.post('/update-subscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.stores.updatesubscriber(req, res);
});

module.exports = router;