import graphql from 'graphql';
import axios from 'axios';
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const baseUrl = 'http://localhost:3000'

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  description: 'a company graph "type" that holds fields relevent to a company in real life',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data)
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'company and user type fields for the root resolver',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age, companyId }) {
        return axios.post('http://localhost:3000/users', { firstName, age, companyId })
          .then(res => res.data);
      }
    },
     deleteUser: {
         type: UserType,
         args: {id: {type: GraphQLNonNull(GraphQLString)}},
         resolve(parentValue, {id}){
            let deletedUser;
            return axios.get(`${baseUrl}/users/${id}`) // this is because json server does not return the deleted user
                .then(res => res.data)
                    .then(res => {
                        axios.delete(`${baseUrl}/users/${id}`)
                        return res
                      })
         }
     }
  }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation
  });

// module.exports = new GraphQLSchema({
//     mutation,
//     query: RootQuery
//   });

// export const schema = schema;