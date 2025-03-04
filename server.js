/*********************************************************************************

WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Manpreet Singh 
Student ID: 149578239 
Date: 05-02-2025
Vercel Web App URL: _______________________________________________________
GitHub Repository URL: ______________________________________________________

********************************************************************************/ 


const express = require("express");
const path = require("path");
const storeService = require("./store-service.js"); 

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/about");
});

// Route for about
app.get("/about", (req, res) => res.sendFile(__dirname + "/views/about.html"));

app.get("/test-about", (req, res) => res.send("About page route is working!"));

// Route for /shop
app.get("/shop", (req, res) => {
    storeService.getPublishedItems()
        .then(data => {
            res.json(data); 
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        });
});

// Route for /items
app.get("/items", (req, res) => {
    storeService.getAllItems()
        .then(data => {
            res.json(data); 
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        });
});

// Route for /categories
app.get("/categories", (req, res) => {
    storeService.getCategories()
        .then(data => {
            res.json(data); 
        })
        .catch(err => {
            res.status(500).json({ message: err }); 
        });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});


storeService.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error initializing the store service:", err);
    });




