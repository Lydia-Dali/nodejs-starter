var express = require('express');
var router = express.Router();
const mediasController = require('../controllers/mediasController')

/* GET medias listing. */
router.get('/', mediasController.index);

/* GET media by id. */
router.get('/:id', mediasController.show);

/* POST new media. */
router.post('/create', mediasController.create);

/* PUT edit media. */
router.put('/edit/:id', mediasController.edit);

/* DELETE existing media. */
router.delete('/:id', mediasController.delete);

module.exports = router;
