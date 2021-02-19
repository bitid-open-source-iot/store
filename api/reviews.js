const bll = require('../bll/bll');
const router = require('express').Router();

router.use(function timeLog(req, res, next) {
	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.add(req, res);
});

router.post('/get', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.get(req, res);
});

router.post('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.list(req, res);
});

router.post('/update', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.update(req, res);
});

router.post('/delete', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.delete(req, res);
});

router.post('/reject', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.reject(req, res);
});

router.post('/approve', (req, res) => {
	var myModule = new bll.module();
	myModule.reviews.approve(req, res);
});

module.exports = router;