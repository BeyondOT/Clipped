const userRoutesDoc = require("./user.doc");

const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Clipped-MERN-API",
    description: "This is the api for my Clipped-MERN project.",
    contact: {
      email: "achraf.buisness@gmail.com",
    },
    servers: [
      {
        url: "http://192.168.1.24:5000",
        description: "Local Dev",
      },
    ],
  },
  tags: [
    {
      name: "User",
      description: "User routes",
    },
  ],
  paths: {
    ...userRoutesDoc,
  },
};

module.exports = swaggerOptions;
