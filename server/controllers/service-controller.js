const Service = require("../models/service-model")

const serviceFunc = async (req, res) => {
    
    try {
        const response = await Service.find(); 
        if(!response) {
            res.status(404).json({msg: "No Service Found"})
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({msg: "Error in Service-Controller"})
    }
}

module.exports = serviceFunc;