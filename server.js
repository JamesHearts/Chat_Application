const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const app = express();
app.use(cors());
var server = app.listen(3000, console.log(`listening on port 3000!`));
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

let comments = JSON.parse(fs.readFileSync('./comments.json'));

let readComments = (req, res) => {
    res.json(comments);
    io.emit('interval', comments);
};


// returns list of comments
app.get('/comments', readComments);

// adds to list of comments
app.post('/comments', (req, res) => {
    comments.unshift(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), () => {
        console.log('writing to comments success!');
        io.emit('comment');
        res.end();
    });
});

// changes flag in list of comments
app.put('/comments/:id', (req, res) => {
    const flag = req.body.flag;
    const index = comments.findIndex(comment => comment.id === req.params.id);
    comments[index].flag = flag;

    fs.writeFile('./comments.json', JSON.stringify(comments), () => {
        console.log('comment flagged success!');
        io.emit('comment');
        res.end();
    });
});

// deletes comment
app.delete('/comments/:id', (req, res) => {
    const newComments = comments.filter(comment => comment.id !== req.params.id);
    comments = newComments;
    fs.writeFile('./comments.json', JSON.stringify(comments), () => {
        console.log('comment deletion success!');
        io.emit('comment');
        res.end();
    });
});

// generates a random number for interval client id
let generateRandomNumber = () => {
    const numberA = crypto.randomBytes(4);
    const numberB = crypto.randomBytes(4);
    return numberA.join('') + '-' + numberB.join('');
}

// starts io server connection
io.on('connection', (socket) => {
    console.log('user connected!');
});

// sets an interval for 30 seconds and tells client to update
// setInterval(() => {
//     const comment = {
//         id: generateRandomNumber(),
//         clientId: 'random client',
//         comment: 'random client comment',
//         timeStamp: new Date(),
//         flag: 'N'
//     };

//     comments.unshift(comment);

//     fs.writeFile('./comments.json', JSON.stringify(comments), () => {
//         console.log('random comment creation success!');
//         io.emit('comment');
//     });
// }, (30 * 1000));