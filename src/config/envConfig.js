// src/config/envConfig.js
require('dotenv').config();

module.exports = {
  githubRepoUrl: process.env.GITHUB_REPO_URL,
  githubBranch: process.env.GITHUB_BRANCH,
};
