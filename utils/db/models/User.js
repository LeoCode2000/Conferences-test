import { model, models, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: String,
    role: { type: String, default: 'attendant' },
    password: { type: String, required: true },
    conferences: [{ type: Schema.Types.ObjectId, ref: 'Conference' }],
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};


export default models.User || model('User', userSchema);