# GtaVehicleMetaScraper
A NodeJS tool to scrap alle vehicle models from a folder (or the subfolders) containing vehicles.meta files. Windows and Linux supported!

# Vehicle Meta File Scraper

This Node.js script is designed to recursively search through a specified directory for files named `vehicles.meta`, copy them to a target directory with a new naming convention, extract specific model names from these files, and save the results to a text file while removing any duplicate entries. It's a useful tool for managing and extracting data from vehicle metadata files in various projects.

## Features

- **Directory Selection**: Use a dialog to select both source and target directories for file operations.
- **Recursive Search**: Recursively search through all subdirectories in the chosen source directory.
- **File Copying**: Copy `vehicles.meta` files to a target directory, renaming them to ensure uniqueness.
- **Data Extraction**: Extract vehicle model names from the meta files.
- **Duplicate Removal**: Remove duplicate entries in the final output.

## Requirements

Before running the script, make sure you have Node.js installed on your machine. You can download and install Node.js from [Node.js official website](https://nodejs.org/).

Additionally, you need to install the `node-file-dialog` package, which is used for opening file dialog windows. Install it using npm:

```bash
npm install node-file-dialog
```

## Usage

To run the script, navigate to the directory where the script is located and run the following command:

```bash
node metascraper.js
```

You will be prompted to select the source directory and the target directory through the file dialog windows that will appear.

## 📂 File Structure

- `metascraper.js`: The main script file.

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the script's directory:
   ```bash
   cd path/to/metascraper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the script:
   ```bash
   node metascraper.js
   ```

Enjoy using the Vehicle Meta File Scraper for your projects! 🎉

---

Made with ❤️
