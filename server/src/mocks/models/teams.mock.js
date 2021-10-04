let idCount = 0;
let data = {};

const resetMockData = () => {
    idCount = 0;
    data = {};
}

const teamsMock = {
    findAll: () => Object.values(data),
    findByPk: (id) => data?.[id],
    create: (team) => {
        team.id = ++idCount;
        data[team.id] = team;
        return data[team.id]
    },
    update: (team, options) => {
        const { id } = options.where;
        data[id] = {...data[id], ...team};
        return data[id];
    },
    destroy: (options) => {
        const { id } = options.where;
        delete data[id];
    }
}

module.exports = {
    teamsMock,
    resetMockData
};
