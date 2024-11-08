const router = require('express').Router();
const { AirplaneController } = require('../../controllers/index');
const { validateCreateAirplaneRequest } = require('../../middlewares/index');
router.post(
  '/',
  validateCreateAirplaneRequest,
  AirplaneController.createAirplane
);
router.get('/', AirplaneController.getAllAirplanes);
router.get('/:id', AirplaneController.getAirplaneById);
module.exports = router;
