const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const filePath = "./example.txt";
let commitNumber = 1;

if (fs.existsSync("./commit_number.txt")) {
  commitNumber =
    parseInt(fs.readFileSync("./commit_number.txt", "utf-8"), 10) || 1;
}

// GitHub details from .env
const githubUsername = process.env.GITHUB_USERNAME;
const githubBranch = process.env.GITHUB_BRANCH;

function makeChanges() {
  const newContent = `This is an automated change - ${new Date().toISOString()}\n`;
  fs.appendFileSync(filePath, newContent, "utf-8");
  console.log("File updated with new content");
}

function commitChanges() {
  const commitMessage = `git commit message ${commitNumber}`;
  exec("git add .", (err) => {
    if (err) {
      console.error("Error adding files:", err);
      return;
    }

    exec(`git commit -m "${commitMessage}"`, (err) => {
      if (err) {
        console.error("Error committing files:", err);
      } else {
        console.log(`Committed successfully with message: ${commitMessage}`);
        commitNumber++;
        fs.writeFileSync(
          "./commit_number.txt",
          commitNumber.toString(),
          "utf-8"
        );
        pushChanges();
      }
    });
  });
}

function pushChanges() {
  exec("git push", (err) => {
    if (err) {
      console.error("Error pushing files:", err);
    } else {
      console.log("Changes pushed to GitHub");
    }
  });
}

function runProcess() {
  makeChanges();
  commitChanges();
}

setInterval(runProcess, 3 * 60 * 60 * 1000);
runProcess();

// Serve the frontend
app.use(express.static(path.join(__dirname, "frontend")));

// API to provide GitHub details
app.get("/api/github-details", (req, res) => {
  res.json({ username: githubUsername, branch: githubBranch });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
