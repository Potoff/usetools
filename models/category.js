module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Category;
};
