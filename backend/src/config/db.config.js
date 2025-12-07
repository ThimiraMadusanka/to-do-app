const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        define: {
            noPrimaryKey: true,
        },
        timezone: '+05:30'
    }
);

sequelize.authenticate().then(res => {
    console.log('Connected to database -> from Sequelize');
})
.catch(e => {
    console.log('Failed to connect to database -> from Sequelize', e);
})

module.exports = sequelize;