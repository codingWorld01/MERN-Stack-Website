const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');
const authValidation = require('../middlewares/authValidation');
const adminMiddleware = require('../middlewares/admin-Middleware');
const multer = require('multer');
const path = require('path');

router
    .route('/users')
    .get(authValidation, adminMiddleware, adminController.getAllUsers);

router
    .route('/users/delete/:id')
    .delete(authValidation, adminMiddleware, adminController.deleteUserById);

router
    .route('/users/edit/:id')
    .get(authValidation, adminMiddleware, adminController.getUserData);

router
    .route('/users/update/:id')
    .patch(authValidation, adminMiddleware, adminController.updateUser);

router
    .route('/contact')
    .get(authValidation, adminMiddleware, adminController.getAllContacts);

router
    .route('/contact/delete/:id')
    .delete(authValidation, adminMiddleware, adminController.deleteContactById);

router
    .route('/services')
    .get(authValidation, adminMiddleware, adminController.getAllServices);

router
    .route('/services/edit/:id')
    .get(authValidation, adminMiddleware, adminController.getServiceData);

router
    .route('/services/update/:id')
    .patch(authValidation, adminMiddleware, adminController.updateService);

router
    .route('/services/delete/:id')
    .delete(authValidation, adminMiddleware, adminController.deleteService);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.route('/services/new')
    .post(authValidation, adminMiddleware, upload.single('image'), adminController.createService);

module.exports = router;
