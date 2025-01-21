import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const UserMiddleware = {
  validateRegister: async (req, res, next) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if (!email) throw new Error('Email không được bỏ trống!');
        if (email) {
            const formatEmail = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!formatEmail) throw new Error('Email không đúng định dạng!');
        }
        if (!username) throw new Error('Username không được bỏ trống!');
        if (!password) throw new Error('Mật khẩu không được bỏ trống!');
        if (!confirmPassword) throw new Error('Mật khẩu xác nhận không được bỏ trống!');
        next();
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
        });
    }
  },
  validateLogin: async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if (!email) throw new Error('Email không được bỏ trống!');
        if (email) {
            const formatEmail = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            if (!formatEmail) throw new Error('Email không đúng định dạng!');
        }
        if (!password) throw new Error('Mật khẩu không được bỏ trống!');
        next();
    } catch (error) {
        res.status(403).send({
            message: error.message,
            data: null,
        });
    }
  },

    modifyUser: async (req, res, next) => {
        const accessToken = req.headers.authorization.split(' ')[1];
        console.log(accessToken);
        if (!accessToken) {
            res.status(400).send({
                message: 'Permisson denined!',
                data: null
            });
        } else {
            // jwt.verify(accessToken, SECRET_KEY, (err, decoded) => {
            //     if (err) {
            //         res.status(401).send({
            //             message: err.message,
            //             data: null
            //         });
            //     } else {
            //         req.user = decoded;
            //         return next();
            //     }
            // }); 
           const decoded = jwt.verify(accessToken, SECRET_KEY);
            req.user = {
                _id: decoded._id
            }
           next()
        }  
    }

};

export default UserMiddleware;
