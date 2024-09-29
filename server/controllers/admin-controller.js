const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
const User = require("../models/user-model");
const multer = require('multer');
const path = require('path');


const getAllUsers = async (req, res) => {
    try {
        const response = await User.find();

        if (!response) {
            res.status(400).json({ message: "No Users Found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.log("Error Found in getAllUsers ", error);
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await User.deleteOne({ _id: id });

        res.status(200).json({ message: "User Deleted Successfully" });


    } catch (error) {
        next(error);
    }
}

const getUserData = async (req, res) => {
    try {
        const id = req.params.id;

        const response = await User.findOne({ _id: id }).select({
            password: 0
        });

        if (!response) {
            res.status(400).json({ message: "User Not Found" });
        }

        res.status(200).json(response);

    } catch (error) {
        console.log("Error Found in getUserData ", error);
    }
}

const updateUser = async (req, res) => {
    try {
        console.log("Hello");
        const id = req.params.id;
        const data = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set: data
        });

        res.status(200).json(updatedData);
    } catch (error) {
        console.log("Error Found in updateUser ", error);
    }
}

const getAllContacts = async (req, res) => {
    try {
        const response = await Contact.find();

        if (!response) {
            res.status(400).json({ message: "No Contacts Found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.log("Error Found in getAllUsers", error);
    }
}

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Contact.deleteOne({ _id: id });

        res.status(200).json({ message: "Contact Deleted Successfully" });


    } catch (error) {
        next(error);
    }
}



const getAllServices = async (req, res) => {
    try {
        const response = await Service.find();

        if (!response) {
            res.status(400).json({ message: "No Services Found" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.log("Error Found in getAllUsers", error);
    }
}


const getServiceData = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Service.findOne({ _id: id }).select({
            password: 0
        });

        if (!response) {
            res.status(403).json({ message: "Service Data Not Found" });
        }

        res.status(201).json(response);
    } catch (error) {
        console.log("Error Found in getServiceData ", error);
    }
}


const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedData = await Service.updateOne({ _id: id }, {
            $set: data
        });

        if (updatedData) {
            res.status(201).json(updatedData);
        }
        else {
            res.status(403).json("No Service Updates");
        }
    } catch (error) {
        console.log("Error Found in updateService ", error);
    }
}

const deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Service.deleteOne({ _id: id });
        res.status(200).json({ message: "Service Deleted Successfully" });


    } catch (error) {
        console.log("Erro Found in deleteService ", error);
    }
}

const createService = async (req, res) => {
    try {
        const { provider, price, service, description } = req.body;
        const image = req.file ? req.file.filename : null;

        const newService = new Service({
            image,
            provider,
            price,
            service,
            description
        });

        const response = await newService.save();

        if (!response) {
            return res.status(401).json({ message: "Service not created" });
        }

        res.status(200).json({ message: "Service Created", service: response });
    } catch (error) {
        console.log("Error Found in createService ", error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { getAllUsers, getAllContacts, getAllServices, deleteUserById, getUserData, updateUser, deleteContactById, getServiceData, updateService, deleteService, createService };