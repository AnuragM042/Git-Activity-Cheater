// src/services/gitService.js
const { exec } = require('child_process');
const { githubRepoUrl, githubBranch } = require('../config/envConfig');

function runGitCommands() {
  return new Promise((resolve, reject) => {
    // Initialize Git repository if needed
    exec('git init', (err) => {
      if (err) return reject(`Error initializing Git: ${err}`);

      // Check if remote origin is set; add it if not
      exec(`git remote add origin ${githubRepoUrl}`, (err) => {
        if (err && !err.message.includes('already exists')) return reject(`Error adding remote: ${err}`);

        // Stage all changes
        exec('git add .', (err) => {
          if (err) return reject(`Error adding files: ${err}`);

          // Commit changes
          exec('git commit -m "Automated commit from Node.js"', (err) => {
            if (err && !err.message.includes('nothing to commit')) {
              return reject(`Error committing files: ${err}`);
            }

            // Force push to GitHub
            exec(`git push -u origin ${githubBranch} --force`, (err) => {
              if (err) return reject(`Error pushing to GitHub: ${err}`);
              resolve('Changes pushed to GitHub successfully');
            });
          });
        });
      });
    });
  });
}

module.exports = {
  runGitCommands,
};
