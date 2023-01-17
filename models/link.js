require("./category");

module.exports = (sequelize, Sequelize) => {
  const Link = sequelize.define(
    "Link",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      img_url: {
        type: Sequelize.STRING,
        defaultValue: "https://pixabay.com/fr/photos/cl%c3%a9-outil-%c3%a9quipement-r%c3%a9paration-3013129/",
        allowNull: false,
        notEmpty: true
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Link;
};
