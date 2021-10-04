class NotFoundError extends Error {
    constructor(message) {
        super();
        this.message = message || 'Not found';
        this.status = 404;
    }
}

class InvalidParamsError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.status = 400
    }
}

const handleErrors = (callback) => {
    return (req, res) => {
        try {
            callback(req, res)
        } catch (e) {
            res.status(e.status);
            res.json({error: e.message});
        }
    }
}

module.exports = {
    handleErrors,
    NotFoundError,
    InvalidParamsError
}