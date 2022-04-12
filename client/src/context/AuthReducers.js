const AuthReducer = (state, action) => {
    switch(action.type){

        case "LOGIN_START": 
            return {
                user: null, 
                isFetching: true, 
                error: false
            };

        case "LOGIN_SUCCESS": 
            return {
                user: action.payload, 
                isFetching: false, 
                error: false
            };
            
        case "LOGIN_FAILURE": 
            return {
                user: null, 
                isFetching: false, 
                error: true
            };

        case "UPDATE_NAME":
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.payload
                }
            };
            
        case "UPDATE_CITY":
            return {
                ...state,
                user: {
                    ...state.user,
                    city: action.payload
                }
            };

        case "UPDATE_FROM":
            return {
                ...state,
                user: {
                    ...state.user,
                    from: action.payload
                }
            };
            
        case "UPDATE_STATUS":
            return {
                ...state,
                user: {
                    ...state.user,
                    description: action.payload
                }
            };

        case "UPDATE_RELATIONSHIP":
            return {
                ...state,
                user: {
                    ...state.user,
                    relationship: action.payload
                }
            };

        case "UPDATE_PROFILE_PICTURE":
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload
                }
            };

        case "FOLLOW": 
            return {
                ...state, 
                user: {
                    ...state.user, 
                    following: [...state.user.following, action.payload]
                },
            };

        case "UNFOLLOW": 
            return {
                ...state, 
                user: {
                    ...state.user, 
                    following: state.user.following.filter(
                        (following) =>following !== action.payload
                    )
                },
            };

        case "LOGOUT":
            localStorage.setItem("user", "null");
            return {
                user: null,
                isFetching : false,
                error: false
            }

        default:
            return state;
    }
}

export default AuthReducer;