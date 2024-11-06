// src/services/gitService.js
const { exec } = require('child_process');
const { githubRepoUrl, githubBranch } = require('../config/envConfig');

// Run Git commands
function runGitCommands() {
  return new Promise((resolve, reject) => {
    // Initialize Git repository if needed
    exec('git init', (err) => {
      if (err) reject(`Error initializing Git: ${err}`);

      // Add remote origin if not added
      exec(`git remote add origin ${githubRepoUrl}`, (err) => {
        if (err && !err.message.includes('already exists')) reject(`Error adding remote: ${err}`);

        // Stage all changes
        exec('git add .', (err) => {
          if (err) reject(`Error adding files: ${err}`);

          // Commit changes
          exec('git commit -m "Automated commit from Node.js"', (err) => {
            if (err) reject(`Error committing files: ${err}`);

            // Push to GitHub
            exec(`git push -u origin ${githubBranch}`, (err) => {
              if (err) reject(`Error pushing to GitHub: ${err}`);
              else resolve('Changes pushed to GitHub successfully');
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
