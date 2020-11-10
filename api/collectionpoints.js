const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.get(req, res);
});

router.put('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.collectionpoints.updatesubscriber(req, res);
});

module.exports = router;