module.exports = {
  users: [],

  products: [
    {
      id: "1",
      code: "EX-221",
      title: "jacket",
      price: "334",
      varients: {
        colors: ["red", "blue", "green"],
        sizes: ["M", "S", "L"],
      },
      isDiscount: false,
      isCouponAccepted: false,
    },
    {
      id: "2",
      code: "EX-222",
      title: "jeans",
      price: "335",
      varients: {
        colors: ["red", "blue", "green"],
        sizes: ["M", "S", "L"],
      },
      isDiscount: false,
      isCouponAccepted: false,
    },
    {
      id: "3",
      code: "EX-223",
      title: "shirt",
      price: "331",
      varients: {
        colors: ["red", "blue", "green"],
        sizes: ["M", "S", "L"],
      },
      isDiscount: false,
      isCouponAccepted: false,
    },
  ],

  cart: {},

  order: {},
};
