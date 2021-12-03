const jwt = require("jsonwebtoken");

module.exports = {
  checkValidUserFromEmailPassword: ({ email, password, accessLocation }) => {},
  verifyToke: (req, res, next) => {
    console.log(req.headers.route);
    switch (req.headers.route) {
      case "/getproducts" || "/createmultidevicelogin":
        try {
          console.log("middleware", req.headers.authrized);
          const token_ = jwt.verify(
            req.headers.authrized,
            "288biu18bd3bk3hih2k2iu3"
          );
          console.log(token_);
          if (token_) {
            console.log(token_);
            req.user = token_.id;
            next();
          }
        } catch (error) {
          console.log(error);
          return error;
        }
        break;

      default:
        next();
    }
  },
};
