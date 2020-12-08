// let _url  = 'https://api.github.com/search/users?q=brad+repos:%3E10+followers:%3E250';
// let _url  = `https://api.github.com/search/repositories?q=Brad&sort=stars&order=desc`;
const token = 'token a7d0717732e2d5b56d196d7f45a0756e06afe136';
  export default class GitHubReposService {
  getUsers = async (url) => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': token
        }
      });
      const data = await res.json() 
      return data;
    } catch(err) {
      throw new Error(err)
    }
  }
  checkStared = async (url) => {
    try {
      const res = await fetch('https://api.github.com/user/starred',
      {
        method:'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': token
        }
      })
      const data = await res.json();
      return data;
    }
    catch(err) {
      throw new Error(err)
    }
  }
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
  }
  unStarring = async (owner, repo) => {
    try {
      const res = await fetch(`https://api.github.com/user/starred/${owner}/${repo}`,
      {
        method:'DELETE',
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'Authorization': token
        }
      })
      return res;
    }
    catch(err) {
      console.log(err)
      throw new Error(err)
    }
  };
};

new GitHubReposService()