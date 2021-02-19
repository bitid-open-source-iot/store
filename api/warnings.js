const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/add', (req, res) => {
    var myModule = new bll.module();
    myModule.warnings.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.warnings.get(req, res);
});

router.post('/list', (req, res) => {
    var myModule = new bll.module();
    myModule.warnings.list(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.warnings.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.warnings.delete(req, res);
});

module.exports = router;