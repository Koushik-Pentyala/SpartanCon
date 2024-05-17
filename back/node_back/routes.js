const router = require('express').Router();

const messageController = require('./controllers/messageController');


router.get('/', (req, res) => {
    res.send('Server is running')
})


router.post('/chat', messageController);


module.exports = router;