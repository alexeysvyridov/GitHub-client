import {
    SET_STARED,
    DELETE_STAR,
    UPDATE_STAR, 
    USERS_LOADED,
    USERS_ERROR,
    OPEN_USER,
    SEARCH_USERS
} from './actionTypes';
import GitHubReposService from './services';
const token = 'token 1b645e8cad0ed916bf658d4a4fe37e41b28aca68';
const gitHubReposService = new GitHubReposService();
export const setStared = (users) => {
    return {
        type: SET_STARED,
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
        user:user
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
export const searchUsers = (users) => {
    console.log(users);
    return {
        type: SEARCH_USERS,
        payload: users
    };
};
export const fetchUsers = () => (url) => (dispatch) =>{
    console.log(url);
        dispatch(usersLoaded());
        gitHubReposService
        .getUsers()
        .then((data) => dispatch(setStared(data)))
        .catch((err) => dispatch(usersError()));
};

export const fetchUsersData = (url) => async (dispatch) => {
    dispatch(usersLoaded());
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': token
            } 
        });
        const data = await res.json();   
        dispatch(searchUsers(data.items));
        } catch (err) {
        console.log(err);
        dispatch(usersError(err));
        }
};
