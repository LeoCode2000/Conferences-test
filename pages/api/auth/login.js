import jwt from "jsonwebtoken";
import { connect } from "../../../utils/db";
import User from "../../../utils/db/models/User";
import { config } from '../../../config';

connect()

export default async function login(req, res) {
    if (req.method === "POST") {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
            }
            else {
                if (user.password === password) {
                    const token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: "1h"
                    });
                    res.status(200).json({
                        message: "Login successful",
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token
                    });
                }
                else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}