const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const multer = require('multer');

// Using multer
const storageMulter = multer.diskStorage({
    destination: (req, file, cb) => { // a,b,c
      cb(null, './public/uploads'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+ file.originalname);// 1638246115366hai.jpeg
    }
  });
  
  const upload = multer({
    storage: storageMulter,
    limits: {
      fileSize: 10000000 // 10MB
    } // 1MB = 1,000,000byte
  })

// routers (/blogs)


router.get('/new', (req, res) => {
  res.render('new')
});

router.post('/', upload.single('image'), async (req, res) => { // wait == 기다리다
  
    let blog = new Blog({
        vaccine: req.body.vaccine,
        user: req.body.user,
        hospital: req.body.hospital,
        feeling: req.body.feeling,
        img: req.file.filename
    });

    blog = await blog.save(); // id generated
    res.redirect(`/blogs/${blog.id}`)
});


router.get('/:id', async (req, res) => {
    let blog = await Blog.findOne({_id: req.params.id});
    if(blog){
      res.render('show', {showBlog: blog})  
    } else {
        res.redirect('/')
    }
});

router.get('/edit/:id', async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  res.render('edit', {blog: blog})
})


router.put('/:id', upload.single('image'), async (req, res) => {
  
  req.blog = await Blog.findById(req.params.id);
  let blog = req.blog;
  
  blog.vaccine = req.body.vaccine
  blog.user =  req.body.user
  blog.hospital =  req.body.hospital
  blog.feeling = req.body.feeling
  blog.img = req.file.filename

  try {
    blog = await blog.save();
    res.redirect(`/blogs/${blog.id}`)
  } catch {
    console.log('Fail')
  }
})

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect('/')
});

module.exports = router;

// Angular, VueJS, React