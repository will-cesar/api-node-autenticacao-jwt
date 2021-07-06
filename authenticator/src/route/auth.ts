import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { STATUS, User } from "../entity/User";

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    const user: User = new User(email, name, password);
    const response = user.isValid();

    if (response === STATUS.OK) {
        const authCtrl = new AuthController();

        try {
            const savedUser = await authCtrl.registerUser(user);
            return res.json(savedUser);
        }
        catch (error) {
            return res.status(500).json({ message: STATUS.REGISTER_ERROR });
        }
    }
    else {
        return res.status(400).json({ message: response });
    }
});