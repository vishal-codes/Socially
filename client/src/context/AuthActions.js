export const LoginStart = () => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const UpdateName = (name) => ({
    type: "UPDATE_NAME",
    payload: name
});

export const UpdateCity = (city) => ({
    type: "UPDATE_CITY",
    payload: city
});

export const UpdateFrom = (from) => ({
    type: "UPDATE_FROM",
    payload: from
});

export const UpdateStatus = (status) => ({
    type: "UPDATE_STATUS",
    payload: status
});

export const UpdateRelationship = (relationship) => ({
    type: "UPDATE_RELATIONSHIP",
    payload: relationship
});

export const UpdateUserProfilePicture = (profilePicture) => ({
    type: "UPDATE_PROFILE_PICTURE",
    payload: profilePicture
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
});

export const UnFollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const LogOut = () => ({
    type: "LOGOUT"
});