import { Sequelize, DataTypes} from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
});

const User = sequelize.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,    
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Service = sequelize.define('Service', {
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    monthlyFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weeklyTreatment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    monthlyTreatment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unlimitedTreatment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    messages: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.hasMany(Service);
Service.belongsTo(User);

sequelize.sync();
console.log("Sigma elindult");

export default { sequelize, User, Service};