const service = require('../services/compayny.service.js');

exports.recruitmentList = async (req, res) => {
  const {search} = req.query;
  let serviceResult;
  if (search) {
  } else {
    serviceResult = await service.getRecruitmentList();
  }

  if (serviceResult.result) {
    res.json(serviceResult);
  } else {
  }
};

exports.createRecruitment = async (req, res) => {
  const serviceResult = await service.createRecruitment(req.body);
  if (serviceResult.result) {
    res.json(serviceResult);
  } else {
    res.sendStatus(500);
  }
};

exports.updateRecruitment = async (req, res) => {
  const serviceResult = await service.updatePosting(req.body);
  if (serviceResult.result) {
    res.json(serviceResult);
  } else {
    res.sendStatus(500);
  }
};

exports.deleteRecruitment = async (req, res) => {
  const serviceResult = await service.deleteRecruitment(req.body);
  if (serviceResult.result) {
    res.json(serviceResult);
  } else {
    res.sendStatus(500);
  }
};
