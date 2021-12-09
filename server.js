// Call the module
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog');
const Blog = require('./models/Blog');

// Clear valualble
const app = express();


// Connect DB
mongoose.connect('mongodb+srv://sean:1234@cluster0.coirx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(console.log('MongoDB connectd'))
.catch((err) => console.log(err));

// Set View engine
app.set('view engine', 'ejs'); // For using EJS

// Set urlencoded for encoding
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Route(Main)
app.get('/', async (req, res) => { 
    let info = await Blog.find() // array
    res.render('index', {infos: info});
});

// Route(Serve)
app.use('/blogs', blogRouter);

// Run Server
const PORT = 4000;
app.listen(PORT, () => {
    // API_KEY, I_AM_KEY, MONGODB_URI, KEY_VALUE etc
    // Be careful when u deploy it
    console.log(`Server is learning on http://localhost:${PORT}`) // https (HyperText Transfer Protocol Secure) ://
});

/*
arrs = [ {name: Sean}, {name: Thuy Tien}, {name: Huy} ]
arrs.forEach(arr => console.log(arr.name) )
[
    { 
        id: blabka,
        vaccine: AZ, 
        name: Sean,
        hospital: "FV"
    },
    { 
        id: blabka,
        vaccine: AZ, 
        name: Sean,
        hospital: "FV"
    },
    { 
        id: blabka,
        vaccine: AZ, 
        name: Sean,
        hospital: "FV"
    }
]
*/