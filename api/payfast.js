var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
  	next();
});

router.post('/cancel', (req, res) => {
    var myModule = new bll.module();
    myModule.payfast.cancel(req, res);
});

router.post('/payment', (req, res) => {
    var myModule = new bll.module();
    myModule.payfast.payment(req, res);
});

module.exports = router;