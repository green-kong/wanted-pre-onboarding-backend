const service = require('../services/compayny.service.js');

exports.createRecruitment = async (req, res) => {
  const serviceResult = await service.recruitment(req.body);
  if (serviceResult.result) {
    res.json(serviceResult);
  } else {
    res.sendStatus(500);
  }
};
