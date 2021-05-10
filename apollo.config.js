/* eslint-disable */

require("dotenv").config({ path: "./.env.local" });

module.exports = {
  client: {
    name: "client",
    includes: ["./src/**/!(*.test).{ts,tsx}"],
    tagName: "gql",
    addTypename: true,
    service: {
      name: "hasura",
      url: process.env.HASURA_GRAPHQL_ENDPOINT,
      headers: {
        "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET,
      },
    },
  },
};
