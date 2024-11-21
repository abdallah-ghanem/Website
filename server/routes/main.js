const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/* 
    GET/
    HOME
*/

//Routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "The App for be a developer",
            discriptions: "This blog by NodeJs and MongoDB"
        }

        let perPage = 10;//to show only 10 posts for main page
        let page = req.query.page || 1;//to retrive number of pages
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments(); // Replace Post.count()

        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }

});


/* 
    GET/
    POST :id
*/

router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById(slug);//must data retrive first
        const locals = {
            title: data.title,
            discriptions: "This blog by NodeJs and MongoDB"
        }
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }

});


/**
 * POST /
 * Post - searchTerm
*/

router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "search",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or:[
                { title: { $regex: new RegExp(searchNoSpecialChar, i)}},
                { body: { $regex: new RegExp(searchNoSpecialChar, i)}}
            ]
        });

        res.render("search", {
            data,locals
        });
    } catch (error) {
        console.log(error);
    }

});




/* function insertPostData() {
    Post.insertMany([
        {
            title: "Test",
            body: "This is body for test"
        },
        {
            title: "Deployment of Node.js applications",
            body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
        },
        {
            title: "Authentication and Authorization in Node.js",
            body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
        },
        {
            title: "Understand how to work with MongoDB and Mongoose",
            body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
        },
        {
            title: "build real-time, event-driven applications in Node.js",
            body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
        },
        {
            title: "Discover how to use Express.js",
            body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
        },
        {
            title: "Asynchronous Programming with Node.js",
            body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
        },
        {
            title: "Learn the basics of Node.js and its architecture",
            body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
        },
        {
            title: "NodeJs Limiting Network Traffic",
            body: "Learn how to limit netowrk traffic."
        }
    ])
}
insertPostData(); */




module.exports = router;