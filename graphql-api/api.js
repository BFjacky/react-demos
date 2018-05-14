const { graphql, buildSchema, query } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    name:String
    array:[String!]
  }
`);

const root = { hello: 'Hello world!', name: 'CYF', array: ['str1', 'str3'], info: { class: 'wj1501', sex: 'male' } };

const gql = `{__typename,hello,name,array}`;
// query myQuery{
//   hello
//   name
//   array
// }
graphql(schema, gql, root).then((response) => {
  console.log(response);
});