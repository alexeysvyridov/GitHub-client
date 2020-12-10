import {SET_STARED} from './actionTypes';

export const setStared = (stared) => {
    return {
        type: SET_STARED,
        stared: stared
    }
}