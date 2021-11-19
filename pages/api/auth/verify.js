import jwt from 'jsonwebtoken';
import { config } from '../../../config';
import { connect } from '../../../utils/db';

connect();

export default async function verify(req, res) {
    try {
        const decoded = jwt.verify(req.headers.authorization, config.secret);
    } catch (error) {
        return res.status(401).json({
            error: 'Unathorized',
        });
    }
}