

const validation = (schema) => async (req, res, next) => {
    try {
        const parsebody = await schema.parseAsync(req.body);
        // console.log("Parsebody is " , parsebody)
        next();
    } catch (err) {
        const status = 400;
        const message = err.errors[0].code;
        const extradetails = err.errors[0].message;

        // console.log(err);
        
        const error = {
            status,
            message,    
            extradetails
        }

        next(error);

    }
}

module.exports = validation;