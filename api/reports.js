const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/sales', (req, res) => {
    var myModule = new bll.module();
    myModule.reports.sales(req, res);
});

module.exports = router;