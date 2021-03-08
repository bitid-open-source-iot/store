const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
	next();
});

router.get('/invoice', (req, res) => {
	var myModule = new bll.module();
	myModule.download.invoice(req, res);
});

module.exports = router;