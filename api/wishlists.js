const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.wishlists.add(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.wishlists.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.wishlists.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.wishlists.delete(req, res);
});

module.exports = router;