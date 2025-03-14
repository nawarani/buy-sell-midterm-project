const express = require('express');
const router  = express.Router();
// handles the logout route and redirection
router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;