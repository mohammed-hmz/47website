import express from "express";
import path from "path";
import { createConnection } from "mysql2";
import pkg2 from 'jsonwebtoken';
const { sign, verify } = pkg2;
import pkg from 'bcryptjs';
const { compare, hash } = pkg;
import { promisify } from "util";
import dotenv from  "dotenv"
const app=express()
dotenv.config();
import {fileURLToPath} from 'url';
import { dirname,join} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


export async function login  (req, res) {
    try {
        const { username, password } = req.body;

        db.query('SELECT * FROM students WHERE username = ?', [username], async (err, results) => {
            console.log(results[0]);
            if (!results[0] || ! await compare(password, results[0].user_password)) {//bcrypt.compare
                
                const message = encodeURIComponent('wrong name or password');
                return res.status(400).redirect(`/login?message=${message}`);
            } else {
                const id = results[0].user_id;
                const token = sign({ id }, process.env.JWT_SECRET, {//jwt.sign
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES *3600000//1h
                    ),
                    httpOnly: true,
                    secure: true,
                }
                
                res.cookie('userSave', token, cookieOptions);
             
                res.status(200).redirect("/")
            }
        })
    } catch (err) {
        console.log(err);
    }
}
export async function register (req, res)  {
    console.log(req.body);
    const { username } = req.body;
    db.query('SELECT * from students WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.send("user exist");
            }
        } 

        let password=username+"2004"
        let hashedPassword = await hash(password, 10);
        console.log(hashedPassword);

        db.query('INSERT INTO students(username,  user_password ) values(?,?)', [username, hashedPassword ], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("registers");
            }
        })
    })
}

export async function isLoggedIn (req, res, next)  {
    if (req.cookies.userSave) {
        try {
            // 1. Verify the token
            const decoded = await promisify(verify)(req.cookies.userSave,
                process.env.JWT_SECRET
            );
            console.log(decoded);

            // 2. Check if the user still exist (maybe i delele him and his cookie still exist)
            db.query('SELECT * FROM students WHERE user_id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            });
        } catch (err) {
            console.log(err)
            return next();
        }
    } else {
        res.sendFile("moh.html", { root: './public/' })
    }
}

export function delet (req, res) {
    const {username}=req.body
    db.query("select * from students where username=?",[username],(err, results) => {
        if (results[0]) {
            db.query("delete from students where username=?",[username]);
            toastr.success('This is a success message!');
          return  res.send("deleted successfully");
        } else if(err)  {
           console.log(err)
        }else return res.send(`user "${username}" does not exist!`);
       
    })
    
}
export function logout (req, res) {
    res.cookie('userSave', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.cookie('userSa', 'logout', {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true
    });
    res.status(200).redirect("/");
}