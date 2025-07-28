module.exports = (sequelize, Sequelize) => {
  const Data = sequelize.define(
    "lists",
    {
      user_id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Data;
};
