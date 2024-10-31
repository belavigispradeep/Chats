const express = require("express");
const app=express();
const port=8080;
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("Conecction Successful");
})
.catch((err)=>{
    console.error(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// const chat1 = new Chat({
//     from:"Anu",
//     to:"Pradeep",
//     message:"I love bike ride with you",
//     created_at: new Date(),
// });

// chat1.save().then((result)=>{
//     console.log(result);
// }).catch((err)=>{
//     console.log(err);
// })

app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats)
    // res.send("all chats are working");
    res.render("index.ejs",{chats});
})

app.get("/",(req,res)=>{
    res.send("Root is working");
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
    const chat = new Chat(req.body);
    chat.save().then((result)=>{
        res.redirect("/chats");
        }).catch((err)=>{
            res.status(500).send(err);
            });
});
app.get("/chats/:id/edit",(req,res)=>{
    Chat.findById(req.params.id).then((chat)=>{
        res.render("edit.ejs",{chat});
    }).catch((err)=>{
        res.status(500).send(err);
    })
});
app.put("/chats/:id",(req,res)=>{
    Chat.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true}).then((result)=>{
        res.redirect("/chats");
        }).catch((err)=>{
            res.status(500).send(err);
        });
});
app.delete("/chats/:id",(req,res)=>{
    Chat.findByIdAndDelete(req.params.id).then((result)=>{ 
        res.redirect("/chats");
        }).catch((err)=>{
            res.status(500).send(err);
        });
    });

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});