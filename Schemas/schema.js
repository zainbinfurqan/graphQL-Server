const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type getAllUsers {
        id: String
        firstName: String
        lastName: String
        accessLocation: String
        lastLogin: String
    }

    type productVarients {
        colors: [String]
        sizes: [String]
    }

    type getAllProduct {
        id: String
        code: String
        title: String
        price: String
        isDiscount: Boolean
        isCouponAccepted: Boolean
        varients: productVarients
    }

    type getSingleProduct {
        id: String
        code: String
        title: String
        price: String
        isDiscount: Boolean
        isCouponAccepted: Boolean
        varients: productVarients
    }

    type getUserProfile {
        firstName: String
        lastName: String
        location: String
    }

    type cartProductVarient {
        color: String
        size: String
    }

    type getUserCartResponse {
        id: String
        count: Int
        productId: String
        varient: cartProductVarient
    }

    type getUserCart {
        id : String
        data: [getUserCartResponse]
    }

    type multiDeviceLoginResponse {
        token: String
        redirectRoute: String
        user : getAllUsers
    }

    type RootQuery {
        getUsersQuery: [getAllUsers]
        getProductsQuery: [getAllProduct]
        getSingleProductQuery(id: String): getSingleProduct
        getUserProfileQuery(id: String): getUserProfile
        getUserCartQuery(id: String): getUserCart
        multiDeviceLogin(id: String) : multiDeviceLoginResponse
    }

    type createCartResponse {
        id: String
    }

    type createOrderResponse {
        id: String
    }

    type updateCartResponse {
        id: String
    }

    type loginUserResponse {
        token: String
        user : getAllUsers
    }

    type registrationUserResponse {
        message: String
    }

    type createMultiDeviceLoginTokenResponse {
        token: String
    }

    input userCartInputRequest {
        id: String
        count: Int
        productId: String
        varient: cartVarient
    }

    input cartVarient {
        color: String
        size: String
    }

    input cartInputReq {
        id: String
        data: [userCartInputRequest]
    }

    input loginInputReq {
        email: String
        password: String
        accessLocation: String
        route: String
    }

    input registrationInputReq {
        firstName: String
        lastName: String
        email: String
        password: String
    }

    input multiDeviceLoginInputReq {
        currentRoute: String
    }
    
    type RootMutation {
        createCartMutation(cartInput: cartInputReq) : createCartResponse
        updateCartMutation(cartInput: cartInputReq) : updateCartResponse
        createOrderMutation(cartInput: cartInputReq) : createOrderResponse
        loginUserMutation(loginInput: loginInputReq) : loginUserResponse
        registrationUserMutation(registrationInput: registrationInputReq) : registrationUserResponse
        createMultiDeviceLoginTokenMutation(multiDeviceLoginInput:multiDeviceLoginInputReq): createMultiDeviceLoginTokenResponse
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
