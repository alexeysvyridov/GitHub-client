import {
    FETCH_USERS,
    DELETE_STAR,
    UPDATE_STAR, 
    USERS_LOADED,
    USERS_ERROR,
    OPEN_USER,
    SEARCH_USERS,
    SET_STARED_USERS
} from './actionTypes';
import GitHubReposService from './services';
let _url  = `https://api.github.com/search/repositories?q=brad&sort=stars&order=desc`;
const token = 'token 3aa74d2222aad3f61f6a474177db6c34155cd317';
const gitHubReposService = new GitHubReposService();

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
    console.log(users);
    return {
        type: SEARCH_USERS,
        payload: users
    };
};

export const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoaded());
  try {
      const res = await fetch(_url, {
          method: 'GET',
          headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': token
          } 
      });
      const data = await res.json();   
      dispatch(setUsers(data.items));
      } catch (err) {
      console.log(err);
      dispatch(usersError(err));
      }
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


export const unStarring =  (user ) => async (dispatch) => {
    const {owner, name} = user;
    try {
      const res = await fetch(`https://api.github.com/user/starred/${owner.login}/${name}`,
      {
        method:'DELETE',
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'Authorization': token
        }
      })
      dispatch(deleteStar(user));
      return res;
    }
    catch(err) {
      console.log(err);
      dispatch(usersError(err));
    }
  };


export const fetchStaredUsers =  () => async (dispatch) => {
    try {
      const res = await fetch('https://api.github.com/user/starred',
      {
        method:'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': token
        }
      });
      const data = await res.json();
      dispatch(setStaredUsers(data))
      return data;
    }
    catch(err) {
      throw new Error(err)
    }
  };


export const setStarring =  (user) => async (dispatch) => {
    const { owner, name } = user;
    try {
      const res = await fetch(`https://api.github.com/user/starred/${owner.login}/${name}`,
      {
        method:'PUT',
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'Authorization': token
        }
      });
      dispatch(updateStar(user))
    }
    catch(err) {
      console.log(err)
      throw new Error(err)
    }
  };