const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
mongoose.connect('mongodb://localhost/authors', { useNewUrlParser: true });

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Please enter a name.' ],
        minlength: [ 3, 'Name must be at least three characters.' ]
    }
}, { timestamps: true });

const Author = mongoose.model('Author', AuthorSchema);


// GET: Retrieve all Authors
app.get('/authors', function(req, res){
    Author.find({}, function(err, authors){
        if(err){
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
           res.json({message: 'All Authors:', data: authors})
        }
     });
});

// GET: Retrieve a. Author by ID
app.get('/authors/:id', function(req, res){
    Author.findOne({ _id: req.params.id }, function(err, author){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'Author:', data: author})
        }
    });
});

// POST: Create an Author
app.post('/authors', function(req, res){
    var newAuthor = new Author();
    newAuthor.name = req.body.name;
    newAuthor.save(function(err, author){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'New Author:', data: author})
        }
    });
});

// PUT: Update an Author by ID
app.put('/authors/:id', function(req, res){
    Author.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, function (err, author) {
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            res.json({message: 'Updated Author:', data: author})
        }
    });
});

// DELETE: Delete an Author by ID
app.delete('/authors/:id', function(req, res){
    Author.remove({ _id: req.params.id }, function(err){
        if (err) {
            console.log('*********************');
            console.log('Returned Error: ', err);
            res.json({message: 'Error', error: err})
        }
        else {
            Author.find({}, function(err, authors){
                if(err){
                    console.log('*********************');
                    console.log('Returned Error: ', err);
                    res.json({message: 'Error', error: err})
                }
                else {
                   res.json({message: 'Deletion Successful:', data: authors})
                }
            });
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function () {
    console.log('listening on port 8000');
});