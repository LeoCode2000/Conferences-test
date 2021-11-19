import User from '../db/models/User';

export async function validateUserRole(id) {
    const user = await User.findOne({ _id: id });
    if (user) {
        return user.role;
    }
    else {
        return false;
    }
}
