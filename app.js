import express from "express"
import path from "path"
import {createConnection} from "mysql2";

import cookieParser from "cookie-parser";
import {fileURLToPath} from 'url';
import { dirname, join } from 'path';

const app=express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})

import router1 from './routes/pages.js';
import router2 from './routes/auth.js';


   
app.use('/', router1);
app.use('/auth', router2);


app.listen(3000)