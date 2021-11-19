import Cookies from "universal-cookie";
import {
    getConferences as getConferencesApi,
    updateConferenceStatus as updateConferenceStatusApi,
    subscribe as subscribeApi,
    unSubscribe as unSubscribeApi,
    getUsers as getUsersApi
} from "../../utils/services";

const cookies = new Cookies();

export function setUser(user) {
    return {
        type: 'SET_USER',
        user
    };
}

export function setUsers(users) {
    return {
        type: 'SET_USERS',
        users
    };
}

export function setConferences(conferences) {
    return {
        type: 'SET_CONFERENCES',
        conferences
    };
}

export function login(user) {
    return function (dispatch) {
        const cookies = new Cookies();
        cookies.set('user', user, { path: '/' });
        dispatch(setUser(user));
    }
}

export function logout() {
    cookies.remove('user');
    return {
        type: 'LOGOUT'
    };
}

export function getConferences(token) {
    return function (dispatch) {
        getConferencesApi(token)
            .then(res => {
                console.log("res", res)
                dispatch(setConferences(res.conferences));
            }).catch(err => {
                alert(err.message);
            });

    }
}

export function updateConferenceStatus(conferenceId, token) {
    return function (dispatch) {
        updateConferenceStatusApi(conferenceId, token).then(res => {
            dispatch(getConferences(token));
        }).catch(err => {
            alert(err.message);
        });
    }
}

export function subscribe(conferenceId, token) {
    return function (dispatch) {
        subscribeApi(conferenceId, token).then(res => {
            dispatch(getConferences(token));
        }).catch(err => {
            alert(err.message);
        });
    }
}

export function unSubscribe(conferenceId, token) {
    return function (dispatch) {
        unSubscribeApi(conferenceId, token).then(res => {
            dispatch(getConferences(token));
        }).catch(err => {
            alert(err.message);
        });
    }
}

export function getUsers(token) {
    return function (dispatch) {
        getUsersApi(token).
            then(res => {
                console.log("users res", res)
                dispatch(setUsers(res.data));
            }).catch(err => {
                console.log("users err", err)
            }).catch(err => {
                alert(err.message);
            });
    }

}