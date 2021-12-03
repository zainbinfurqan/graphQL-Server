const jwt = require("jsonwebtoken");

module.exports = {
  checkValidUserFromEmailPassword: ({ email, password, accessLocation }) => { },
  verifyToke: (req, res, next) => {
    if (["/getproducts", "/createmultidevicelogin"].indexOf(req.headers.route) > -1) {
      try {
        const token_ = jwt.verify(
          req.headers.authrized,
          "288biu18bd3bk3hih2k2iu3"
        );
        if (token_) {
          req.user = token_.data.id;
          next();
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    next();
  },
};
