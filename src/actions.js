import {SET_STARED, DELETE_STAR, UPDATE_STAR} from './actionTypes';

export const setStared = (stared) => {
    return {
        type: SET_STARED,
        stared: stared
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