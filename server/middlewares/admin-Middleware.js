

const adminMiddleware = (req, res, next) => {
    try {
        const isAdmin = req.user.isAdmin;

        if (!isAdmin) {
            res.status(404).json({ message: "Access Denied! User is not an Admin" });
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;