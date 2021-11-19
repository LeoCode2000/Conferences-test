import { connect } from '../../../utils/db';
import User from '../../../utils/db/models/User';

connect();

export default async function handler(req, res) {
    try {
        const findUser = await User.findOne({ email: req.body.email })
        if (findUser) {
            res.status(400).json({ message: 'User already exists' })
        }
        else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });
            const newUser = await user.save()
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
