import Conference from "../../../utils/db/models/Conference";
import jwt from "jsonwebtoken";
import { config } from "../../../config";
import { validateUserRole } from '../../../utils/validators/user.validators'
import { connect } from "../../../utils/db";

connect();

export default async (req, res) => {
    if (req.method === "GET") {
        const id = jwt.decode(req.headers.authorization, config.secret);
        try {
            if (id) {
                const userRole = await validateUserRole(id.id);
                if (userRole === "speaker") {
                    const available = await Conference.find({ status: "active" });
                    const owned = await Conference.find({ speaker: id.id });
                    res.status(200).json({
                        success: true,
                        conferences: {
                            available,
                            owned
                        }
                    });
                }
                else if (userRole === "attendant") {
                    const available = await Conference.find({ attendants: { $nin: [id.id] } }).where("status").equals("active");
                    const subscribed = await Conference.find({ status: "active", }).where("attendants").equals(id.id);
                    res.status(200).json({
                        success: true,
                        conferences: {
                            available,
                            subscribed,
                        }
                    });
                }
                else {
                    const available = await Conference.find({ status: "active" });
                    res.status(200).json({
                        success: true,
                        conferences: {
                            available
                        }
                    });
                }
            }
            else {
                const available = await Conference.find({ status: "active" });
                res.status(200).json({
                    success: true,
                    conferences: {
                        available
                    }
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
    else {
        res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }
}