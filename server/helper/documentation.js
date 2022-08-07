const swaggerOptions = {
  failOnErrors: true,
  swaggerDefinition: {
    info: {
      title: "CLippped-API",
      version: "0.0.1",
      description: " This is a simple api for my clipped app.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local dev",
      },
      {
        url: "http://production.prod",
        description: "Production dev",
      },
    ],
  },
  apis: ["./routes/user.routes.js"],
};

module.exports = swaggerOptions;
