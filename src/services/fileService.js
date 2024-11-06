// src/services/fileService.js
const fs = require('fs');
const path = require('path');

// Define the file path to be created or updated
const filePath = path.join(__dirname, '..', '..', 'example.txt');

// Function to create or update the file
function createOrUpdateFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, 'Automated commit by Node.js\n', (err) => {
      if (err) reject(`Error creating/updating file: ${err}`);
      else resolve('File created/updated successful ly');
    });
  });
}

module.exports = {
  createOrUpdateFile,
};
