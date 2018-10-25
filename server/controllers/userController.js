const db = require("../models");

// Defining methods for the userController
module.exports = {
  getUser: (req, res, next) => {
    console.log('===== user!!======');
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  register: (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    // ADD VALIDATION
    db.User.findOne({ 'username': username }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the username: ${username}`
        });
      }
      const newUser = new db.User({
        'firstName': firstName,
        'lastName': lastName,
        'username': username,
        'password': password
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    });
  },
  logout: (req, res) => {
    if (req.user) {
      req.session.destroy();
      res.clearCookie('connect.sid'); // clean up!
      return res.json({ msg: 'logging you out' });
    } else {
      return res.json({ msg: 'no user to log out!' });
    }
  },
  auth: function(req, res, next) {
		console.log(req.body);
		console.log('================');
		next();
  },
  authenticate: (req, res) => {
		console.log('POST to /login');
		const user = JSON.parse(JSON.stringify(req.user)); // hack
		const cleanUser = Object.assign({}, user);
		if (cleanUser) {
			console.log(`Deleting ${cleanUser.password}`);
			delete cleanUser.password;
		}
		res.json({ user: cleanUser });
  },
  getAllSavedArticles: (req, res) => {
    db.findById(req.params.id)
      .populate("FakeArticles", "RealArticles")
      .then(dbUser => res.json({savedFake: dbUser.savedFake, savedReal: dbUser.savedReal}))
      .catch(err => res.status(422).json(err));
  },
  updateUserSavedFakeArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$push: {savedFake: req.body.fakeArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  },
  updateUserSavedRealArticles: (req, res) => {
    db.User
      .findByIdAndUpdate(req.params.id, {$push: {savedReal: req.body.realArticleId}})
      .then(() => res.json({message: "Article Saved"}))
      .catch(err => res.status(422).json(err));
  }
};