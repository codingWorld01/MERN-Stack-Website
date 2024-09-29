// require('dotenv').config();
const express = require('express');
const app = express();
const auth_router = require('./router/auth-router');
const connectDB = require('./utils/db');
const error_handling = require('./middlewares/error_handling');
const contact_router = require('./router/contact-router');
const service_router = require('./router/service-router')
const cors = require('cors');
const admin_router = require('./router/admin-router');
const path = require('path');
const URL = "servicenow-backend.vercel.app";

const corsOption = {
    origin: "https://servicenow-kappa.vercel.app",
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true
}

app.use(cors(corsOption));
app.use(express.json());
app.use(auth_router);
app.use(error_handling);
app.use(contact_router);
app.use(service_router);
app.use('/admin', admin_router)
app.use('/Images', express.static(path.join(__dirname, 'public/Images')));




connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port no ${PORT}`);
    })
})
