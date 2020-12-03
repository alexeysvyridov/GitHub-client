export default class GitHubReposService {
  getUsers = async (url) => {
    const res = await url;
    return res
  }
};

new GitHubReposService()