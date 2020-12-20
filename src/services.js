// let _url  = 'https://api.github.com/search/users?q=brad+repos:%3E10+followers:%3E250';
import {
  usersLoaded,
  usersError,
  deleteStar,
  setStaredUsers, 
  updateStar,
  searchUsers,
  setUsers
} from './actions';
let _url  = `https://api.github.com/search/repositories?q=brad&per_page=10&sort=stars&order=desc`;
const token = 'token 2c2a81b88046787b8a32c3803c71ec4f37850561';

export default class GitHubReposService {
    fetchUsers = () => async (dispatch) => {
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
    
   fetchUsersData = (url) => async (dispatch) => {
      // dispatch(usersLoaded());
      try {
          const res = await fetch(url, {
              method: 'GET',
              headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': token
              } 
          });
          const data = await res.json();   
            console.log(data)
          dispatch(searchUsers(data.items));
          } catch (err) {
          console.log(err);
          dispatch(usersError(err));
        }
    };
    
    
    unStarring =  (user ) => async (dispatch) => {
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
    
    
     fetchStaredUsers =  () => async (dispatch) => {
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
        dispatch(setStaredUsers(data));
        } catch (err) {
        console.log(err);
        dispatch(usersError(err));
        }
};


 unStarring =  (user) => async (dispatch) => {
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


 setStarring =  (user) => async (dispatch) => {
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
  }
}
new GitHubReposService()