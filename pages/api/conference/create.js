import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { connect } from '../../../utils/db';
import Conference from '../../../utils/db/models/Conference';
import User from '../../../utils/db/models/User';
import { validateUserRole } from '../../../utils/validators/user.validators';

connect();

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const id = jwt.decode(req.headers.authorization, config.secret).id;
            const user = await User.findOne({ _id: id });
            if (user.role === "speaker") {
                const {
                    name,
                    date,
                    location,
                    quota,
                    state,
                } = req.body;

                const conferece = new Conference({
                    speaker: user._id,
                    speakerName: user.name,
                    name,
                    date,
                    location,
                    quota,
                    state,
                });

                const newConferece = await conferece.save();
                res.status(201).json(newConferece);

            } else {
                res.status(403).json({
                    error: 'You are not authorized to perform this action.'
                });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed" });
    }
}