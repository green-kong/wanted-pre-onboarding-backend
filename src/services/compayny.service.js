const db = require('../db/models');

exports.recruitment = async (payload) => {
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
