import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { connect } from '../../../utils/db';
import Conference from '../../../utils/db/models/Conference';
import User from '../../../utils/db/models/User';

connect();

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const id = jwt.decode(req.headers.authorization, config.secret).id;
            const user = await User.findOne({ _id: id });
            const conference = await Conference.findOne({ _id: req.body.conferenceId });
            if (user.role === "speaker") {
                if (conference.speaker.toString() == user._id.toString()) {
                    if (conference.state === "active" && conference.attendants.length < 1) {
                        conference.state = "inactive";
                        await conference.save();
                        res.status(200).json({
                            success: true,
                            message: "Conference inactivate successfully"
                        });
                    }
                    else if (conference.state === "inactive") {
                        conference.state = "active";
                        await conference.save();
                        res.status(200).json({
                            success: true,
                            message: "Conference activated successfully"
                        });
                    }
                    else {
                        res.status(400).json({
                            success: false,
                            message: "Conference status cant be updated"
                        });
                    }
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: "You are not authorized to update this conference"
                    });
                }
            }
            else {
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