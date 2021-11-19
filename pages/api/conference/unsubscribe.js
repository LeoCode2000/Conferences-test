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

            if (currentUser.role === "attendant" && conference.attendants.includes(currentUser._id)) {
                console.log("currentUser.conferences.length", currentUser.conferences.length);
                const index = currentUser.conferences.indexOf(conference._id);
                currentUser.conferences = currentUser.conferences.slice(0, index).concat(currentUser.conferences.slice(index + 1));
                await currentUser.save();
                const indexConf = conference.attendants.indexOf(currentUser._id);
                conference.attendants = conference.attendants.slice(0, indexConf).concat(conference.attendants.slice(indexConf + 1));
                await conference.save();
                res.status(200).json({
                    message: "Successfully unsubscribed to conference",
                    data: {
                        user: currentUser,
                        conference: conference
                    }
                });
            } else {
                res.status(403).json({
                    message: "You cant unsubscribe to this conference"
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