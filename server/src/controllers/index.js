const teamsController = require('./teams');

module.exports = async (app) => {
    app.use('/teams', teamsController)
    app.get('/', (req, res) => res.status(200).json({rendalomaq: 'test'}))
}