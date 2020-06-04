const router = require('express').Router();
const bodyparser = require('body-parser');

router.use(bodyparser.json());

router.get('/', (req, res, next)=>{
    res.status(200).json({
        error: null,
        data : "...Connected"
    });
});

router.get('/manga_info', ()=>{
    
});

module.exports = router;