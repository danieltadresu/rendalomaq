const { getId } = require('../helpers');
const { models } = require('../../models');
const { NotFoundError } = require('../errors');

const getAll = async (req, res) => {
    const teams = await models.teams.findAll();
    res.status(200).json(teams);
}

const getById = async (req, res) => {
    const id = getId(req);

    const team = await models.teams.findByPk(id);
    if (!team) throw new NotFoundError()

    res.status(200).json(team);
}

const create = async (req, res) => {
    const team = await models.teams.create(req.body);
    res.status(201).json(team);
}

const update = async (req, res) => {
    const id = getId(req);

    const team = await models.teams.findByPk(id);
    if (!team) throw new NotFoundError()

    const updatedTeam = await models.teams.update(req.body, {where: {id}});
    res.status(200).json(updatedTeam);
}

const remove = async (req, res) => {
    const id = getId(req);

    const team = await models.teams.findByPk(id);
    if (!team) throw new NotFoundError()

    await models.teams.destroy({where: {id}});
    res.status(200).end();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
