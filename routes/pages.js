import { Router } from "express";
import { isLoggedIn ,register,  logout ,login}from "../auth.js";
const router = Router();
import { join } from 'path'; 

router.post('/register', register)
router.get('/logout', logout);
router.post('/home', login);


// router.get('/register', (req, res) => {
//     res.sendFile("register.html", { root: './public/' })
// });
router.get('/login', (req, res) => {
    res.sendFile("login.html", { root: './public/' })
});
router.get('/', isLoggedIn, (req, res) => {
    if (req.user) {
        res.sendFile("home.html", { root: './public/' })
    } else {
        res.sendFile("moh.html", { root: './public/' });
    }
})
export default router;