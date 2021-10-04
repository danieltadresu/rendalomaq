const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn();
    return res;
};

const mockRequest = (params = {}, body = {}) => {
    const req = {}
    req.body = body;
    req.params = params;
    return req;
};

module.exports = {
    mockRequest,
    mockResponse
}