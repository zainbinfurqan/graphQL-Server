const express = require("express");
const app = express();
const port = 3000;
const { graphqlHTTP } = require("express-graphql");

const graphQLSchema = require("./Schemas/schema");
const graphQLResolver = require("./Resolvers/resolver");
const { verifyToke } = require("./utils/helpers");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(verifyToke);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true,
    formatError(error) {
      if (!error.originalError) {
        return error;
      }
      return {
        message: error.message || "Something went wrong",
        status: error.originalError.code || 500,
        data: error.data,
      };
    },
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
