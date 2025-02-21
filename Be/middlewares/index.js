import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const middlewares = {
    // xác minh access token
    verifyAccessToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization'];
            if (!authToken) throw new Error('Bạn chưa đăng nhập, không thể thực hiện hành động!');
            const token = authToken.split(' ')[1];
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.currentUser = data;
            next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    },
    // xác minh refresh token
    verifyRefreshToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization'];
            if (!authToken) throw new Error('Bạn chưa đăng nhập, không thể thực hiện hành động!');
            const token = authToken.split(' ')[1];
            const data = jwt.verify(token, process.env.SECRET_KEY);
            req.currentUser = data;
            next();
        } catch (error) {
            res.status(401).send({
                message: error.message,
                data: null,
            });
        }
    },
    // xác thực admin
    validateAdmin: async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            const role = currentUser.role;
            if (role !== "ADMIN") throw new Error('Bạn không phải là ADMIN!');
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
    // xác thực admin hoặc chủ tài khoản
    validateAdminOrAccountOwner: async (req, res, next) => {
        try {
            const {id} = req.params;
            const currentUser = req.currentUser;
            const role = currentUser.role;
            if (role !== "ADMIN" && id !== currentUser._id) throw new Error('Bạn không phải là ADMIN hoặc chủ tài khoản này!');
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
    // xác thực provider
    validateProvider: async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            const role = currentUser.role;
            if (role !== "PROVIDER") throw new Error('Bạn không phải là PROVIDER!');
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
    // xác thực customer
    validateCustomer: async (req, res, next) => {
        try {
            const currentUser = req.currentUser;
            const role = currentUser.role;
            if (role !== "CUSTOMER") throw new Error('Bạn không phải là CUSTOMER!');
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null,
            });
        }
    },
}

export default middlewares