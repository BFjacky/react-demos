const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const games = [
  {
    name: '绝地求生',
    price: "98元"
  },
  {
    name: '守望先锋',
    price: '198元'
  },
  {
    name: '穿越火线',
    price: "1w以上"
  }
]

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book], games:[Game],addGames:[Game] }
  type Book { title: String, author: String }
  type Game { name:String, price:String }
  type Mutation {
    addGames(name:String,price:String):Game
  }

`;

// The resolvers
const resolvers = {
  Query: {
    books: () => books,
    games: () => games,
  },
  Mutation: {
    addGames: (var1, var2) => {
      //在这里执行db操作
      // games.push({ name, price })
      console.log(var1, var2)
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app & allow cors
const app = express();
app.use(cors({
  allowedOrigins: [
    'localhost:3001'
  ]
}))

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
  return {
    schema,
  }
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});