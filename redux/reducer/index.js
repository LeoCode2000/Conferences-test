const initialState = {
    user: {},
    users: [],
    conferences: {
        available: [],
        subscribed: [],
        owned: []
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'LOGOUT':
            return {
                ...state,
                user: {}
            }
        case 'SET_CONFERENCES':
            return {
                ...state,
                conferences: action.conferences
            }
        default:
            return state;
    }
}

export default reducer;
