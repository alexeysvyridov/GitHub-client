// let _url  = 'https://api.github.com/search/users?q=brad+repos:%3E10+followers:%3E250';
let _url  = `https://api.github.com/search/repositories?q=brad&sort=stars&order=desc`;
const token = 'token 3aa74d2222aad3f61f6a474177db6c34155cd317';
  export default class GitHubReposService {
  getUsers = async (url=_url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': token
        }
      });
      const data = await res.json();   
      return data.items;
    } catch (err) {
      console.log(err);
      throw new Error(err)
    }
  }
  checkStared = async () => {
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
      return data;
    }
    catch(err) {
      throw new Error(err)
    }
  };

  starring = async (owner, repo) => {
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
};

new GitHubReposService()