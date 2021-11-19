import { connect } from "../../../utils/db";
import User from "../../../utils/db/models/User";

connect();

export default async function deleteUser(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        const user = await User.findByIdAndDelete({ _id: id });
        if (user) {
            res.status(200).json({
                message: "User deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    else {
        res.status(405).json({
            message: "Method not allowed"
        });
    }
}