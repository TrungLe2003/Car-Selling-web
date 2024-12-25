const UserMiddleware = {
  register: (req, res, next) => {
    try {
      const { email, password, phoneNumber } = req.body;
      if (!email) throw new Error("Email is missing!");
      if (!password) throw new Error("Password is missing!");
      if (!phoneNumber) throw new Error("Phone number is missing!");
      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
      });
    }
  },
};

export default UserMiddleware;
