import { connect } from '../../../utils/db/index';
import User from '../../../utils/db/models/User';

connect()

export default async function getUsersService(req, res) {
    if (req.method === "GET") {
        try {
            const users = await User.find({});
            res.status(200).json({
                success: true,
                data: users
            });
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
