const express = require("express");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3002;
const filePath = "./commit_number.txt";
let commitNumber = 1;

// Load the last commit number from a file
if (fs.existsSync(filePath)) {
  commitNumber = parseInt(fs.readFileSync(filePath, "utf-8"), 10) || 1;
}

// Function to make changes to the file
function makeChanges() {
  const newContent = `This is an automated change - ${new Date().toString()}\n`;
  fs.appendFileSync("./example.txt", newContent, "utf-8");
  console.log("File updated with new content");
}

// Function to commit changes with an incremental message
function commitChanges() {
  const commitMessage = `Automated commit ${commitNumber}`;
  exec("git add .", (err) => {
    if (err) {
      console.error("Error adding files:", err);
      return;
    }

    exec(`git commit -m "${commitMessage}"`, (err) => {
      if (err) {
        console.error("Error committing files:", err);
      } else {
        console.log(
          `Committed successfully with message: ${commitMessage} ::: ${new Date().toString()}}`
        );
        commitNumber++;
        fs.writeFileSync(filePath, commitNumber.toString(), "utf-8");
        pushChanges();
      }
    });
  });
}

// Function to push changes to GitHub
function pushChanges() {
  exec("git push", (err) => {
    if (err) {
      console.error("Error pushing files:", err);
    } else {
      console.log("Changes pushed to GitHub", JSON.stringify(Date.now()));
    }
  });
}

// Schedule automated commit-push cycle every 2 hours

makeChanges();
commitChanges();

// Serve GitHub details dynamically from environment variables
const gitHubDetails = {
  username: process.env.GITHUB_USERNAME,
  branch: process.env.GITHUB_BRANCH,
  url: process.env.GITHUB_REPO_URL,
};

app.use(express.static(path.join(__dirname, "frontend")));
app.get("/api/github-details", (req, res) => {
  res.json(gitHubDetails);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
