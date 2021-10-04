const {getId} = require('../helpers');
const {InvalidParamsError} = require('../errors');

describe('Controllers::Helpers', () => {
    describe('getId()', () => {
        it('should return params as number when is a string number', () => {
            const req = {params: {id: '23'}};
            const id = getId(req);

            expect(id).toBe(23);
        })


        it('should throw InvalidParamsError when is undefined or not a string number', () => {
            const req = {params: {id: '23r'}};
            const reqUndefined = {params: {}};

            expect(() => getId(req)).toThrow(InvalidParamsError);
            expect(() => getId(reqUndefined)).toThrow(InvalidParamsError);
        })
    })
});