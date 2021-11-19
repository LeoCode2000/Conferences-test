export async function login(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export async function register(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function createConference(conference, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/api/conference/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify(conference)
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function subscribe(conferenceId, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`/api/conference/subscribe/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ conferenceId })
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function unSubscribe(conferenceId, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`/api/conference/unsubscribe/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ conferenceId })
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                console.log("falla xdd");
                reject(json);
            }
        }
        catch (error) {
            console.log("falla")
            reject(error);
        }
    });
}

export function getConferences(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('/api/conference', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function updateConferenceStatus(conferenceId, token) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`/api/conference/updatestatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: JSON.stringify({ conferenceId })
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}

export function getUsers(token) {
    return new Promise(async (resolve, reject) => {
        console.log("THETOKEN", token);
        try {
            const res = await fetch('/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                }
            });
            const json = await res.json();
            if (res.status < 300) {
                resolve(json);
            }
            else {
                reject(json);
            }
        }
        catch (error) {
            reject(error);
        }
    });
}