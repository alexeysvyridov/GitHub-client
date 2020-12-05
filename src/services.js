// let _url  = 'https://api.github.com/search/users?q=brad+repos:%3E10+followers:%3E250';
let _url  = `https://api.github.com/search/repositories?q=Brad&sort=stars&order=desc`;
  export default class GitHubReposService {
  getUsers = async (url=_url) => {
    const res = await fetch(_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token b08828ef76912d6b02d5efc87f68460c4f0eacf9 '
      }
    });
    const data = await res.json() 
    console.log(data);
    return data;
  }
};

new GitHubReposService()