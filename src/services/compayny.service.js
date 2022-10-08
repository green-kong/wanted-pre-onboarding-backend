const db = require('../db/models');

exports.getRecruitmentList = async () => {
  try {
    const data = await db.recruitment.findAll({
      attributes: {exclude: ['c_id', 'desc']},
      include: [
        {model: db.company, attributes: ['name', 'reigion']},
        {
          model: db.requireTech,
          attributes: ['id'],
          include: [{model: db.techList, attributes: ['tech']}],
        },
      ],
    });
    return {result: true, data};
  } catch (error) {
    console.error(error);
    return {result: false, message: error.message};
  }
};

exports.createRecruitment = async (payload) => {
  const {c_id, desc, position, bonus, requireTech} = payload;
  const transaction = await db.sequelize.transaction();
  try {
    const result = await db.recruitment.create(
      {c_id, desc, position, bonus},
      {transaction}
    );

    const requireTechArr = requireTech.map((v) => ({
      r_id: result.id,
      t_id: v,
    }));

    await db.requireTech.bulkCreate(requireTechArr, {transaction});
    await transaction.commit();
    return {result: true, message: 'post success'};
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return {
      result: false,
      message: error.message,
    };
  }
};

exports.updatePosting = async (payload) => {
  const {requireTech, name, reigion, c_id, ...rest} = payload;
  const transaction = await db.sequelize.transaction();

  try {
    await db.recruitment.update(
      {
        desc: rest.desc,
        position: rest.position,
        bonus: rest.bonus,
      },
      {where: {id: rest.id}},
      {transaction}
    );

    if (requireTech) {
      const requireTechArr = requireTech.map((v) => ({
        r_id: rest.id,
        t_id: v,
      }));
      await db.requireTech.destroy({where: {r_id: rest.id}}, {transaction});
      await db.requireTech.bulkCreate(requireTechArr, {transaction});
    }

    if (name) {
      await db.company.update({name}, {where: {id: c_id}}, {transaction});
    }

    if (reigion) {
      await db.company.update({reigion}, {where: {id: c_id}}, {transaction});
    }

    await transaction.commit();
    return {result: true, message: 'update success'};
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    return {result: false, message: error.message};
  }
};

exports.deleteRecruitment = async (payload) => {
  const {id} = payload;
  try {
    await db.recruitment.destroy({where: {id}});
    return {result: true, message: 'delete success'};
  } catch (error) {
    console.error(error);
    return {result: false, message: error.message};
  }
};
