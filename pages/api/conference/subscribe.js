import Conference from "../../../utils/db/models/Conference";
import User from "../../../utils/db/models/User";
import jwt from "jsonwebtoken";
import { config } from "../../../config";
import { connect } from "../../../utils/db";

connect();

export default async (req, res) => {
    if (req.method === "POST") {
        try {
            const id = jwt.decode(req.headers.authorization, config.secret).id;
            const currentUser = await User.findOne({ _id: id });
            console.log("currentUser", currentUser);
            const conference = await Conference.findOne({ _id: req.body.conferenceId });
            console.log("conference", conference);
            if (currentUser.role === "attendant" && !conference.attendants.includes(currentUser._id.toString()) && conference.quota > 0) {
                console.log("currentUser.conferences.length", currentUser.conferences.length);
                if (currentUser.conferences.length > 0) {
                    currentUser.conferences = currentUser.conferences.concat([conference._id]);
                }
                else {
                    currentUser.conferences = [conference._id];
                }
                await currentUser.save();
                console.log("conference.attendants.length", conference.attendants.length);
                if (conference.attendants.length > 0) {
                    conference.attendants = conference.attendants.concat([currentUser._id]);
                }
                else {
                    conference.attendants = [currentUser._id];
                }
                conference.quota = conference.quota - 1;
                await conference.save();
                res.status(200).json({
                    message: "Successfully subscribed to conference",
                    data: {
                        user: currentUser,
                        conference: conference
                    }
                });
            } else {
                res.status(403).json({
                    message: "You cant subscribe to this conference"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
    else {
        res.status(405).send({
            message: "Method not allowed"
        });
    }
}