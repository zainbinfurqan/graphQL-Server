let { users, products, cart, multiDeviceTokens } = require("../Database/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { multiDediveLogin } = require("../utils/helpers");

module.exports = {
  async loginUserMutation({ loginInput }) {
    try {
      const response = users.filter((item) => item.email === loginInput.email);
      if (response.length > 0) {
        const isPasswordMatch = bcrypt.compareSync(
          loginInput.password,
          response[0].password
        );
        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60,
              data: { id: response[0].id },
            },
            "288biu18bd3bk3hih2k2iu3"
          );
          const loginUserData = users.findIndex(
            (item) => item.email === loginInput.email
          );
          users[loginUserData].token = token;
          response[0].lastLogin = new Date();
          response[0].accessLocation = loginInput.accessLocation;
          return {
            token: token,
            user: { ...response[0] },
          };
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  },

  registrationUserMutation({ registrationInput }) {
    try {
      registrationInput.password = bcrypt.hashSync(
        registrationInput.password,
        10
      );
      const userObj = {
        ...registrationInput,
        id: Math.floor(Math.random() * 100000),
      };
      users.push(userObj);
      return "register";
    } catch (error) {
      console.log(error);
    }
  },

  getUsersQuery() {
    return [...users];
  },

  getProductsQuery() {
    return [...products];
  },

  getSingleProductQuery(params) {
    const reponse = products.filter((item) => item.id == params.id);
    return { ...reponse[0] };
  },

  getUserProfileQuery(params) {
    const response = users.filter((item) => item.id == params.id);
    return { ...response[0] };
  },

  getUserCartQuery(params) {
    let response = [cart].filter((item) => item.id === params.id);
    return { ...response[0] };
  },

  createCartMutation({ cartInput }) {
    try {
      cart = { ...cartInput };
      return { ...cart };
    } catch (error) {
      return error;
    }
  },

  updateCartMutation({ cartInput }) {
    try {
      cart = { ...cartInput };
      return { ...cart };
    } catch (error) {
      return error;
    }
  },

  createMultiDeviceLoginTokenMutation({ multiDeviceLoginInput }, req) {
    try {
      const response = users.filter(item => item.id === req.user)
      if (response.length > 0) {
        const multiDevicesToken = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          data: {
            email: response[0].email,
            token: response[0].token
          }
        }, '288biu18bd3bk3hih2k2iu3');
        multiDeviceTokens.push({
          curentRoute: multiDeviceLoginInput.currentRoute,
          token: req.headers.authrized,
          userId: response[0].id,
          expireIn: Math.floor(Date.now() / 1000) + (60 * 60)
        })
        return { token: multiDevicesToken }
      } else {
        return { token: null }
      }
    } catch (error) {
      console.log(error)
    }
  },

  multiDeviceLogin({ id }) {
    try {
      const isTokenVarified = jwt.verify(id, '288biu18bd3bk3hih2k2iu3');
      if (isTokenVarified) {
        const userLoginTokenVerification = jwt.verify(isTokenVarified.data.token, '288biu18bd3bk3hih2k2iu3');
        if (userLoginTokenVerification) {
          isMultiDeviceLoginTokenPresent =
            multiDeviceTokens.filter(
              item => item.userId == userLoginTokenVerification.data.id &&
                item.token == isTokenVarified.data.token
            )
          if (isMultiDeviceLoginTokenPresent.length > 0) {
            const loginUserData = users.filter(
              (item) => item.id === userLoginTokenVerification.data.id
            );
            loginUserData[0].lastLogin = new Date();
            return {
              token: isTokenVarified.data.token,
              redirectRoute: isMultiDeviceLoginTokenPresent[0].curentRoute,
              user: { ...loginUserData[0] },
            };
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
};
