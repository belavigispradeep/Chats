// Import necessary modules
const express = require("express"); // Framework for building web applications
const app = express(); // Initialize Express application
const port = 8080; // Set the port on which the server will run
const path = require("path"); // Module to work with file and directory paths
const mongoose = require("mongoose"); // MongoDB object modeling for Node.js
const Chat = require("./models/chat.js"); // Import the Chat model
const methodOverride = require("method-override"); // Allows usage of HTTP verbs like PUT and DELETE in forms

// Set up view engine and directories
app.set("view engine", "ejs"); // Set view engine to EJS for templating
app.set("views", path.join(__dirname, "views")); // Set path for view templates
app.use(express.static(path.join(__dirname, "public"))); // Set path for static assets
app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies (for POST requests)
app.use(methodOverride("_method")); // Allow method override for using PUT and DELETE with forms

// Connect to MongoDB
main().then(() => {
    console.log("Connection Successful"); // Log successful connection
}).catch((err) => {
    console.error(err); // Log error if connection fails
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // Connect to MongoDB database
}

// Routes

// Route to display all chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find(); // Fetch all chat documents
    res.render("index.ejs", { chats }); // Render the index view with chats data
});

// Root route
app.get("/", (req, res) => {
    res.send("Root is working"); // Send a simple response for the root route
});

// Route to show the form for creating a new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs"); // Render new chat form view
});

// Route to handle chat creation
app.post("/chats", (req, res) => {
    const chat = new Chat(req.body); // Create a new Chat document with form data
    chat.save().then((result) => {
        res.redirect("/chats"); // Redirect to /chats after successful save
    }).catch((err) => {
        res.status(500).send(err); // Send error if save fails
    });
});

// Route to show edit form for a specific chat
app.get("/chats/:id/edit", (req, res) => {
    Chat.findById(req.params.id).then((chat) => {
        res.render("edit.ejs", { chat }); // Render edit view with chat data
    }).catch((err) => {
        res.status(500).send(err); // Send error if chat not found
    });
});

// Route to handle chat update
app.put("/chats/:id", (req, res) => {
    Chat.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((result) => {
            res.redirect("/chats"); // Redirect to /chats after successful update
        }).catch((err) => {
            res.status(500).send(err); // Send error if update fails
        });
});

// Route to handle chat deletion
app.delete("/chats/:id", (req, res) => {
    Chat.findByIdAndDelete(req.params.id).then((result) => {
        res.redirect("/chats"); // Redirect to /chats after successful deletion
    }).catch((err) => {
        res.status(500).send(err); // Send error if deletion fails
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on ${port}`); // Log server start and port
});
