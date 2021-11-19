import mongoose from 'mongoose';

const conn = {
    isConnected: false,
}

export async function connect() {
    if (conn.isConnected) return;
    try {
        const db = await mongoose.connect('mongodb://localhost/testConference');
        conn.isConnected = db.connections[0].readyState;
        console.log("DB conected");
    } catch (error) {
        console.log("dberror", error);
    }
}
