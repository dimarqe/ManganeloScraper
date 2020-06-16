const router = require('express').Router();
const bodyparser = require('body-parser');

router.use(bodyparser.json());


router.get('/genre', (req, res, next) => {
    res.status(200).send({
        message:"...Connected"
    });
});

module.exports = router;