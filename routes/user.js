const router = require('express').Router();

router.get('/testUser', (req, res) => {
	res.send('User test is successfull');
});

module.exports = router;
