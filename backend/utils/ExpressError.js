class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message); // sets the message in Error
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;