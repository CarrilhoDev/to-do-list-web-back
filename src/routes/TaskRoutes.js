const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

//create
router.post('/', TaskValidation, TaskController.create);
//update
router.put('/:id', TaskValidation, TaskController.update);
//findById
router.get('/:id', TaskController.show);
//delete
router.delete('/:id', TaskController.delete);
//marking as done
router.put('/:id/:done', TaskController.done);

//filters
router.get('/filter/all/:macaddress', TaskController.all);
router.get('/filter/late/:macaddress', TaskController.late);
router.get('/filter/today/:macaddress', TaskController.today);
router.get('/filter/week/:macaddress', TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress', TaskController.year);


module.exports = router;