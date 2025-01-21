import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const middlewares = {
    verifyAccessToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization'];
            if (!authToken) throw new Error('Bạn không thể thực hiện hành động!');
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
    verifyRefreshToken: (req, res, next) => {
        try {
            const authToken = req.headers['authorization'];
            if (!authToken) throw new Error('Bạn không thể thực hiện hành động!');
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
}

export default middlewares