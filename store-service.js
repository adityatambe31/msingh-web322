const fs = require("fs").promises; // Use promises with fs
const path = require("path");

// Declare global arrays
let items = [];
let categories = [];

// Initialize function to read data from JSON files
function initialize() {
    return new Promise((resolve, reject) => {
        // Read items.json
        fs.readFile(path.join(__dirname, "data", "items.json"), "utf8")
            .then(data => {
                items = JSON.parse(data); // Parse and assign items
                return fs.readFile(path.join(__dirname, "data", "categories.json"), "utf8");
            })
            .then(data => {
                categories = JSON.parse(data); // Parse and assign categories
                resolve(); // Successfully initialized
            })
            .catch(err => {
                reject("Unable to read file: " + err.message); // Handle errors
            });
    });
}

// Function to get all items
function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject("No results returned."); // Reject if no items
        } else {
            resolve(items); // Resolve with all items
        }
    });
}

// Function to get published items
function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length === 0) {
            reject("No results returned."); // Reject if no published items
        } else {
            resolve(publishedItems); // Resolve with published items
        }
    });
}

// Function to get all categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No results returned."); // Reject if no categories
        } else {
            resolve(categories); // Resolve with all categories
        }
    });
}

// Export the functions
module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
