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
