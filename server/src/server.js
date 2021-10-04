require('./config.js');

const express = require('express');
const app = express();

const startDB = async () => {
    try {
        const sequelize = require('./models');
        await sequelize.sync();
    } catch (error) {
        console.log('Cannot connect to database.', { error });
    }
}

const startServer = async () => {
    try {
        const bodyParser = require('body-parser');
        const cors = require('cors')

        app.use(cors())
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const controllers = require('./controllers');
        await controllers(app);

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        });
    } catch (error) {
        console.log('Cannot start server.', { error });
    }
}

(async () => {
    await startDB();
    await startServer();
})();