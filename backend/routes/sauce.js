const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauce');
const limiter = require('../middleware/limiter')

router.post('/', auth, limiter.apiLimiter, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, limiter.apiLimiter, saucesCtrl.evaluateSauce);
router.put('/:id', auth, limiter.apiLimiter, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, limiter.apiLimiter, saucesCtrl.deleteSauce);
router.get('/:id', auth, limiter.apiLimiter, saucesCtrl.getOneSauce);
router.get('/', auth, limiter.apiLimiter, saucesCtrl.getAllSauce);                          

module.exports = router;
