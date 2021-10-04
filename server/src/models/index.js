const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: 'postgres'
});

const models = [
    require('./team.model')
]

for (const model of models) {
    model(sequelize);
}

module.exports = sequelize;