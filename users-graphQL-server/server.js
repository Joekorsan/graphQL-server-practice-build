import express, { json } from 'express';
import dotenv from 'dotenv';
import {graphqlHTTP as expressGraphQL} from 'express-graphql';
import schema from './schema/schema.js';

// const express = require('express')
// const dotenv = require('dotenv')
// const expressGraphQL = require('express-graphql').graphqlHTTP
// const schema = require('./schema/schema')

dotenv.config();
const app = express();

const port = process.env.PORT || 7000  // running PORT=7070 in the terminal or adding it to your script, sets the process.env.PORT value to 7070, and if its not ran then it default to the infile port value

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
  }));

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
