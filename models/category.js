module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", 
    {
        description:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
    }
    );
    return Category;
};