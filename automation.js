const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();

const filePath = './example.txt';
let commitNumber = 1;  // Initialize commit number

// Load the last commit number from a file
if (fs.existsSync('./commit_number.txt')) {
    commitNumber = parseInt(fs.readFileSync('./commit_number.txt', 'utf-8'), 10) || 1;
}

// Function to make changes to the file
function makeChanges() {
    const newContent = `This is an automated change - ${new Date().toISOString()}\n`;
    fs.appendFileSync(filePath, newContent, 'utf-8');
    console.log('File updated with new content');
}

// Function to commit changes with an incremental message
function commitChanges() {
    const commitMessage = `git commit message ${commitNumber}`;
    exec('git add .', (err) => {
        if (err) {
            console.error('Error adding files:', err);
            return;
        }

        exec(`git commit -m "${commitMessage}"`, (err) => {
            if (err) {
                console.error('Error committing files:', err);
            } else {
                console.log(`Committed successfully with message: ${commitMessage}`);
                commitNumber++;  // Increment commit number after successful commit
                fs.writeFileSync('./commit_number.txt', commitNumber.toString(), 'utf-8');  // Save the updated commit number
                pushChanges();
            }
        });
    });
}

// Function to push changes to GitHub
function pushChanges() {
    exec('git push', (err) => {
        if (err) {
            console.error('Error pushing files:', err);
        } else {
            console.log('Changes pushed to GitHub');
        }
    });
}

// Run the functions
makeChanges();
commitChanges();
