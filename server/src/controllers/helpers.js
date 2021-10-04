const { InvalidParamsError } = require('./errors');

const getId = (req) => {
    const { id } = req.params;
    const regexTest = /^\d+$/.test(id);

    if (regexTest) return +id;
    throw new InvalidParamsError(`Invalid id param: ${id}`)
}

module.exports = {
    getId
}