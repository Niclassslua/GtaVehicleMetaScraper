const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const readline = require('readline');
const fileDialog = require('node-file-dialog');

let fileIndex = 0; // To keep track of file indexing

// Helper function to get directory input using node-file-dialog
async function getDirectoryInput() {
  if (os.platform() === 'win32') {
    // For Windows, use open-file-dialog to select a directory
    try {
      const result = await fileDialog({
        type: 'directory',
        multiple: false // Only allow the selection of one directory
      });
      if (result.length === 0) {
        console.error('No directory selected.');
        process.exit();
      }
      return result[0];
    } catch (error) {
      console.error('Failed to open dialog:', error);
      process.exit();
    }
  } else {
    // For Linux, use command line input to specify the directory
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise(resolve => {
      rl.question("Enter the directory path: ", (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }
}

// Function to recursively copy 'vehicles.meta' files from source to target directory
async function copyVehiclesMeta(dir, targetDir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      await copyVehiclesMeta(fullPath, targetDir);
    } else if (file.isFile() && file.name === 'vehicles.meta') {
      const targetPath = path.join(targetDir, `vehicles_${fileIndex++}.meta`);
      await fs.copyFile(fullPath, targetPath);
      console.log(`File copied: ${targetPath}`);
    }
  }
}

// Function to extract model names from the copied 'vehicles.meta' files
async function extractModelNames(targetDir, outputFile) {
  const files = await fs.readdir(targetDir);
  let extractedNames = [];

  for (const file of files) {
    if (file.startsWith('vehicles_') && file.endsWith('.meta')) {
      const content = await fs.readFile(path.join(targetDir, file), 'utf8');
      const regex = /<modelName>(.*?)<\/modelName>/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        extractedNames.push(match[1]);
      }
    }
  }

  await fs.writeFile(outputFile, extractedNames.join('\n'));
  console.log(`Extracted names saved in ${outputFile}`);
}

// Function to remove duplicate entries from the output file
async function removeDuplicates(outputFile) {
  const content = await fs.readFile(outputFile, 'utf8');
  const lines = content.split('\n');
  const uniqueLines = new Set(lines);

  await fs.writeFile(outputFile, [...uniqueLines].join('\n'));
  console.log(`Duplicates removed. Cleaned file saved as ${outputFile}`);
}

// Main function to execute the workflow
async function main() {
  console.log('Please select the source directory:');
  const sourceDir = await getDirectoryInput();
  console.log('Please select the target directory:');
  const targetDir = await getDirectoryInput();
  const outputFile = path.join(targetDir, 'extractedModelNames.txt'); // Define outputFile here based on selected target directory

  await copyVehiclesMeta(sourceDir, targetDir);
  await extractModelNames(targetDir, outputFile);
  await removeDuplicates(outputFile);
}

main();

