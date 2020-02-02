const initialState = {
    data: null,
    userData: null,
    token: window.localStorage.token,
    isAuth: !!window.localStorage.token,
}

export default ( state = initialState, {type, payload}) => {
    switch (type) {
        case 'USER:SET_DATA':
            return {
                ...state,
               data: payload,
               isAuth: true,
               token: window.localStorage.token
            };
        case 'USER:CHANGE_DATA':
            return {
                ...state,
                userData: {
                   ...state.userData,
                   fullname: payload.fullname,
                   email: payload.email
               },
        };
        case 'USER:SET_USER_DATA':
            return {
                ...state,
                userData: payload,
            };    
        case 'USER:SET_AVATAR':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    avatar: payload
                }
            };
        case 'USER:SET_IS_AUTH':
            return {
                ...state,
                isAuth: payload
            };
        default:
            return state
    }
}