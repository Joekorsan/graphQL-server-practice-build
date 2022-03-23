import express, { json } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.PORT || 7000  // running PORT=7070 in the terminal or adding it to your script, sets the process.env.PORT value to 7070, and if its not ran then it default to the infile port value

app.use(json());


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
