const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limiter = require('../middleware/limiter')
const saucesCtrl = require('../controllers/sauce');

router.post('/', auth, limiter.apiLimiter, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, limiter.apiLimiter, saucesCtrl.evaluateSauce);
router.put('/:id', auth, limiter.apiLimiter, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, limiter.apiLimiter, saucesCtrl.deleteSauce);
router.get('/:id', auth, limiter.apiLimiter, saucesCtrl.getOneSauce);
router.get('/', auth, limiter.apiLimiter, saucesCtrl.getAllSauce);                          

module.exports = router;
