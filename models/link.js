require('./category');

module.exports = (sequelize, Sequelize) => {
    const Link = sequelize.define("Link", 
    {
        description:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        img_url:{
            type: Sequelize.STRING,
            allowNull:false
        },
        CategoryId:{
            type: Sequelize.INTEGER,
            allowNull:false,
            references: {
                model: "Categories",
                key: "id"
            }
        }
    },
    {
        timestamps: false,
    }
    );
    return Link;
};