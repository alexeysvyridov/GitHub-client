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
const token = 'token 53dbf9a33f218ef7fda06bb431db5a18b0f18388';
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
export const fetchUsers = () => (url) => (dispatch) =>{
    console.log(url);
        dispatch(usersLoaded());
        gitHubReposService
        .getUsers()
        .then((data) => dispatch(setUsers(data)))
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


export const unStarring =  (owner, repo ) => async (dispatch) => {
    dispatch(usersLoaded())
    try {
      const res = await fetch(`https://api.github.com/user/starred/${owner}/${repo}`,
      {
        method:'DELETE',
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'Authorization': token
        }
      })
      dispatch(deleteStar());
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


export const starring =  (owner, repo) => async (dispatch) => {
    try {
      const res = await fetch(`https://api.github.com/user/starred/${owner}/${repo}`,
      {
        method:'PUT',
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'Authorization': token
        }
      })
      console.log(res);
      return res;
    }
    catch(err) {
      console.log(err)
      throw new Error(err)
    }
  };