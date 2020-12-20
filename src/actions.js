import {
    FETCH_USERS,
    DELETE_STAR,
    UPDATE_STAR, 
    USERS_LOADED,
    USERS_ERROR,
    OPEN_USER,
    SEARCH_USERS,
    SET_STARED_USERS,
    SET_QUERY
} from './actionTypes';

let _url  = `https://api.github.com/search/repositories?q=brad&sort=stars&order=desc`;

export const setUsers = (users) => {
    return {
        type: FETCH_USERS,
        users: users
    };
};

export const deleteStar = (user) => {
    return {
        type: DELETE_STAR,
        user: user
    };
};

export const updateStar = (user) => {
    return {
        type: UPDATE_STAR,
        user: user
    };
};
export const usersLoaded = (user) => {
    return {
        type: USERS_LOADED,
    };
};
export const usersError = (err) => {
    return {
        type: USERS_ERROR,
        payload: err
    };
};
export const handleClickOpen = (user) => {
    return {
        type: OPEN_USER,
        user: user
    };
};

export const setStaredUsers = (users) => {
    return {
        type: SET_STARED_USERS,
        staredUsers: users
    };
};

export const searchUsers = (users) => {
    return {
        type: SEARCH_USERS,
        payload: users
    };
};
export const setQuery = (query) => {
    return {
        type: SET_QUERY,
        query: query
    };
};
