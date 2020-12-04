// let _url  = 'https://api.github.com/search/users?q=brad+repos:%3E10+followers:%3E250';
let _url  = `https://api.github.com/search/repositories?q=Brad&sort=stars&order=desc`;
  export default class GitHubReposService {
  getUsers = async (url=_url) => {
    const res = await fetch(_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token bebeda9632952eeeacaffcf37b98a340f524ffc5'
      }
    });
    const data = await res.json() 
    console.log(data);
    return data;
  }
};

new GitHubReposService()