const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/loginform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login')); // Ensure 'login' is the correct path
});

app.post('/post', async (req, res) => {
    const { Username, email, Password } = req.body; // Include 'email' as well
    const user = new Post({ // Use 'Post' instead of 'user'
        Username,
        email, // Add the email field
        Password
    });

    try {
        await user.save();
        console.log(user);
        res.send("Form submission successful");
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send("Error saving data");
    }
});

app.listen(port, () => {
    console.log("Server started on port", port);
});
