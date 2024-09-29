

const errorhandler = function async(error, req, res, next) {
    const status = error.status || 404;
    const message = error.message || 'Error in Backend';
    const extradetails = error.extradetails;

    return res.status(status).json({ message, extradetails });
}


module.exports = errorhandler;