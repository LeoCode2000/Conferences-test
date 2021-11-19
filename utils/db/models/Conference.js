import { model, Schema, models } from 'mongoose';

const conferenceSchema = new Schema({
    speaker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    speakerName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    quota: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    attendants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default models.Conference || model('Conference', conferenceSchema);