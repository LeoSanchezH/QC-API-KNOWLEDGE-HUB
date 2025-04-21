const fs = require('fs');
const path = require('path');

// Directory to search
const directoryPath = path.join(__dirname);

// Function to search for a query in all .html files
function searchInHtmlFiles(query) {
    const results = [];

    // Recursively read directory
    function readDirectory(directory) {
        const files = fs.readdirSync(directory);

        files.forEach(file => {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // If it's a directory, read it recursively
                readDirectory(filePath);
            } else if (path.extname(file) === '.html') {
                // If it's an .html file, search for the query
                const content = fs.readFileSync(filePath, 'utf8');
                if (content.includes(query)) {
                    results.push(filePath);
                }
            }
        });
    }

    readDirectory(directoryPath);

    return results;
}

// Example usage
const query = 'search term'; // Replace with your search term
const searchResults = searchInHtmlFiles(query);

if (searchResults.length > 0) {
    console.log('Search results:');
    searchResults.forEach(result => console.log(result));
} else {
    console.log('No results found.');
}