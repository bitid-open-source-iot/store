const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.get(req, res);
});

router.put('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.couriers.updatesubscriber(req, res);
});

module.exports = router;