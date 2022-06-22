import express from 'express';
import { UserModel } from '../../model/Users';
import auth from '../../middleware/authz.middleware'
import bcrypt from 'bcryptjs';
import { sendRefreshToken, comparePassword } from './service';
export const Authentication = express.Router();

Authentication.get("/", async (req, res) => {
    try {
        let User = await UserModel.find({ username: "conzit06" })
        res.send(User);
    } catch (error) {
        console.error({ error: error.message });
        res.status(500).json({ error: error.message })
    }
});

Authentication.post("/register", async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const info = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: hashedPassword
    }
    try {
        let User = await UserModel.findOne({ username: req.body.username })
        if (User) return res.status(200).json("Please sign your account");

        User = new UserModel(info);
        User.save().then((user) => {
            const token = sendRefreshToken(user);
            user.token = token;
            return res.status(200).json(token);
        });

    } catch (error) {
        console.error("Error when posting at Authentication: ", error.message);
        res.status(500).json({ error: error.message });
    }
});

Authentication.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }
        const user = await UserModel.findOne({ username });

        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error("Bad password");

        const token = sendRefreshToken(user);
        user.token = token;

        res.status(200).json(user);
    } catch (error) {
        console.log("Error when posting at Authentication login: ", error);
        res.status(500).json({ error: error.message })
    }
});

Authentication.post("/refresh_token", auth, async (req, res) => {
    const { username } = req.body;
    try {
        let user;
        console.log(username)
        if (username) user = await UserModel.findOne({ username });
        if (user) return sendRefreshToken(user);
    } catch (error) {
        console.error({ error: error.message });
        res.status(500).json({ error: error.message })
    }
});
