var bll     = require('../bll/bll');
var router  = require('express').Router();

router.use(function timeLog(req, res, next) {
  	next();
});

router.post('/add', (req, res) => {
	var myModule = new bll.module();
	myModule.departments.add(req, res);
});

router.post('/get', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.get(req, res);
});

router.put('/list', (req, res) => {
	var myModule = new bll.module();
	myModule.departments.list(req, res);
});

router.post('/share', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.share(req, res);
});

router.post('/update', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.update(req, res);
});

router.post('/delete', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.delete(req, res);
});

router.post('/unsubscribe', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.unsubscribe(req, res);
});

router.post('/updatesubscriber', (req, res) => {
    var myModule = new bll.module();
    myModule.departments.updatesubscriber(req, res);
});

module.exports = router;