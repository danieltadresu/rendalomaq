const {handleErrors, NotFoundError, InvalidParamsError} = require('../errors');
const {mockRequest, mockResponse} = require('../../mocks/global.mock');

describe('Controllers::Errors', () => {
    describe('handleErrors()', () => {
        it('should call callback function when are not errors', () => {
            const res = mockResponse();
            const req = mockRequest();
            const callback = jest.fn();

            handleErrors(callback)(req, res);
            expect(callback).toBeCalledWith(req, res);
        });

        it('should call res error when throw NotFoundError', () => {
            const res = mockResponse();
            const req = mockRequest();
            const callback = jest.fn();

            callback.mockImplementation(() => {
                throw new NotFoundError()
            })

            handleErrors(callback)(req, res);
            expect(callback).toBeCalledWith(req, res);
            expect(res.status).toBeCalledWith(404);
            expect(res.json).toBeCalledWith({error: 'Not found'});
        });

        it('should call res error when throw InvalidParamsError', () => {
            const res = mockResponse();
            const req = mockRequest();
            const callback = jest.fn();

            callback.mockImplementation(() => {
                throw new InvalidParamsError('Invalid params')
            })

            handleErrors(callback)(req, res);
            expect(callback).toBeCalledWith(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.json).toBeCalledWith({error: 'Invalid params'});
        });
    })
})