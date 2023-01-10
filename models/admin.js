module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("Admin", 
    {
        login:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        password:{
            type: Sequelize.STRING,
            allowNull:false
        }
    },
    {
        timestamps: false,
    }
    );
    return Admin;
};