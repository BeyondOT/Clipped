
const user = {
  "_id": "5f80be3856a9cb3418b2f28b",
    "picture": "./uploads/profile/KobeKenjo.jpg",
    "pseudo": "JustFS",
    "email": "kobekenjo@gmail.com",
    "date": "2020-10-09T19:47:04.168Z",
    "__v": 0,
    "following": [
      "5f8d7f7e08d60400f0628701",
    ],
    "updatedAt": "2020-11-11T19:14:22.168Z",
    "followers": [
      "5f8fe53edb205322dcfa2507",
      "5f80bc4a56a9cb3418b2f288",
    ],
    "likes": [
      "5f8edc40f0394433dcc0031c",
      "5f8d7fb108d60400f0628702",
    ],
    "bio": "Hey hey salut"
}


const getUsers = {
  tags: ["User"],
  description: "Returns all the users.",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              user
            },
          },
        },
      },
    },
  },
}

const getUser = {
  tags: ["User"],
  description: "Returns the user.",
}

const register = {
  tags: ["User"],
  description: "Registers the user.",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties:{
            pseudo: {
              type: "string",
              description: "Pseudo of the user.",
              example: "Achraf"
            },
            email: {
              type: "string",
              description: "The e-mail of the user",
              example: "achrafexample@gmail.com"
            },
            password: {
              type: "string",
              description: "The password of the user."
            }
          }
        }
      }
    }
  }
}

const userRoutesDoc = {
  "/user": {
    get: getUsers,
  },
  "/user/{userId}":{
    get: getUser,
  },
  "/user/register":{
    post: register,
  }
}


module.exports = userRoutesDoc;