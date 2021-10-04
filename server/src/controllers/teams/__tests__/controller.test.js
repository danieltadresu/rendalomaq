const {getAll, getById, create, update, remove} = require('../controller');
const {InvalidParamsError, NotFoundError} = require('../../errors');
const {teamsMock, resetMockData} = require('../../../mocks/models/teams.mock');
const {mockRequest, mockResponse} = require('../../../mocks/global.mock');
const { models } = require('../../../models');

jest.mock('../../../models', () => ({models: {teams: {}}}));

describe('Controllers::teams::controller', () => {
    beforeAll(() => {
        models.teams = teamsMock;
    });

    describe('getAll()', () => {
        it('should return empty when are not teams', async () => {
            const req = mockRequest();
            const res = mockResponse();

            await getAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([]);
        });

        it('should return an array with teams', async () => {
            const req = mockRequest();
            const res = mockResponse();

            await models.teams.create({mocked: 'value'})

            await getAll(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{id: 1, mocked: 'value'}]);
        });
    });


    describe('getById()', () => {
        let team1, team2;

        beforeAll(async () => {
            resetMockData();
            team1 = await models.teams.create({mocked: 'value'})
            team2 = await models.teams.create({mocked: 'value2'})
        })

        it('should throw InvalidParamsError for invalid id', async () => {
            const req = mockRequest({id: '23r'});
            const res = mockResponse();

            expect(async () => await getById(req, res)).rejects.toThrow(InvalidParamsError)
        })

        it('should throw NotFoundError for not existing team', async () => {
            const req = mockRequest({id: '3'});
            const res = mockResponse();

            expect(async () => await getById(req, res)).rejects.toThrow(NotFoundError)
        });

        it('should return an array with teams', async () => {
            const req = mockRequest({id: '2'});
            const res = mockResponse();

            await getById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(team2)
        });
    });

    describe('create()', () => {
        beforeAll(async () => {
            resetMockData();
            await models.teams.create({mocked: 'value'})
        })

        it('should create and return the created team', async () => {
            const team = {
                name: 'Frontend',
                description: 'Creacion y optimizacion enfocado a vistas de los proveedores.',
                budget: 50_000_000,
                members: 2
            };
            const req = mockRequest({}, team);
            const res = mockResponse();

            await create(req, res);

            const createdTeam = teamsMock.findByPk(2);

            expect(createdTeam).not.toBeNull();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdTeam);
        });
    });

    describe('update()', () => {
        beforeAll(async () => {
            resetMockData();
            await models.teams.create({mocked: 'value'})
        })

        it('should throw InvalidParamsError for invalid id', async () => {
            const req = mockRequest({id: '23r'});
            const res = mockResponse();

            expect(async () => await update(req, res)).rejects.toThrow(InvalidParamsError)
        })

        it('should throw NotFoundError for not existing team', async () => {
            const req = mockRequest({id: '3'});
            const res = mockResponse();

            expect(async () => await update(req, res)).rejects.toThrow(NotFoundError)
        });

        it('should update and return the updated team', async () => {
            const team = await models.teams.create({
                name: 'Frontend',
                description: 'Creacion y optimizacion enfocado a vistas de los proveedores.',
                budget: 50_000_000,
                members: 2
            });

            const req = mockRequest({id: team.id}, {members: 5});
            const res = mockResponse();

            await update(req, res);

            const updatedTeam = teamsMock.findByPk(team.id);

            expect(updatedTeam).not.toBeNull();
            expect(team.members).toBeLessThan(updatedTeam.members);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedTeam);
        });
    });

    describe('remove()', () => {
        let team1, team2;

        beforeAll(async () => {
            resetMockData();
            team1 = await models.teams.create({mocked: 'value'})
            team2 = await models.teams.create({mocked: 'value2'})
        })

        it('should throw InvalidParamsError for invalid id', async () => {
            const req = mockRequest({id: '23r'});
            const res = mockResponse();

            expect(async () => await remove(req, res)).rejects.toThrow(InvalidParamsError)
        })

        it('should throw NotFoundError for not existing team', async () => {
            const req = mockRequest({id: '3'});
            const res = mockResponse();

            expect(async () => await remove(req, res)).rejects.toThrow(NotFoundError)
        });

        it('should remove the team', async () => {
            const beforeTeams = await teamsMock.findAll();

            const req = mockRequest({id: '2'});
            const res = mockResponse();

            await remove(req, res);
            const afterTeams = await teamsMock.findAll();

            expect(beforeTeams.length).toBe(2);
            expect(afterTeams.length).toBe(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).not.toHaveBeenCalled();
            expect(res.end).toHaveBeenCalled();
        });
    });
})