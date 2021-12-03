let { users, products, cart } = require("../Database/database");
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

  createMultiDeviceLoginTokenMutation({}, req) {
    try {
      console.log(req.user);
    } catch (error) {}
  },

  multiDeviceLogin({ multiDeviceLoginInput }) {
    try {
      return { link: "https://motosport.com" };
    } catch (error) {}
  },
};
