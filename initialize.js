const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

// Connect to MongoDB
main().then(() => {
    console.log("Connection Successful"); // Log successful connection
}).catch((err) => {
    console.error(err); // Log error if connection fails
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp'); // Connect to MongoDB database
}


let allChats = [
    {
        from:"Sakshi",
        to:"Anu",
        message:"Do you love deepu",
        created_at: new Date(),
    },
    {
        from:"Pradeep",
        to:"Anu",
        message:"Are you free today",
        created_at:new Date(),
    },
    {
        from:"Preeti",
        to:"praveen",
        message:"Can you send me the files for the project?",
        created_at:new Date(),
    },
    { 
        from: "Amit",
        to: "Rahul", 
        message: "Hey! Are we still on for the meeting tomorrow?",
        created_at:new Date(), 
    }
];

Chat.insertMany(allChats);
