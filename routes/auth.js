import { Router } from "express";
import { delet, login,logout,register} from "../auth.js";

const router = Router();

router.post('/register', register)
router.post('/login',login);
router.get('/logout', logout);
router.post('/delete', delet)

export default router;