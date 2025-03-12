// // Here we are creating a crud operation with ejs and server side rendering 

// const express = require('express');
// const app=express();

// const path=require("path");
// const userModel=require('./models/user');
// // const userModel=require("./usermodel");

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// // THese both above lines is used to take the input from the user 

// app.set("view engine","ejs");// here we have set the ejs 
// app.use(express.static(path.join(__dirname,"public")));

// app.get("/",(req,res)=>{
//     res.render("index");
// });

// app.get("/read",async(req,res)=>{
//    let users= await userModel.find();
//     res.render("read",{ users });

// });

// app.post("/create",async (req,res)=>{
//     let {name,email,image}=req.body;

// let createdUser =await userModel.create({
//    name,
//    email,
//    image,// both side we are writing this name:name so that we can also write it as this way
// });

// res.send(createdUser);
// });

// app.listen(3000,()=>{
//     console.log('The server is running on port 3000');
// });

const express = require('express');
const path = require('path');
const userModel = require('./models/user'); // User Model

const app = express();

// Middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Read Users Route
app.get("/read", async (req, res) => {
    try {
        let users = await userModel.find();
        res.render("read", { users }); // Passing users to EJS
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Create User Route
app.post("/create", async (req, res) => {
    try {
        let { name, email, image } = req.body;
        let createdUser = await userModel.create({ name, email, image });
        res.redirect("/read");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id); // Delete user by ID
        res.redirect("/read"); // Redirect to read page (without passing users)
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Start the Server
app.listen(3000, () => {
    console.log('The server is running on port 3000');
});
