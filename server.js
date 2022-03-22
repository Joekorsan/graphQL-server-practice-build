import express, { json } from 'express';
const app = express();


app.use(json());


app.listen(8080, () => {
    console.log('server listening on port 8080');
});
