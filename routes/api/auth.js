const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const db = require('../../queries');

// @route   GET api/auth
// @desc    Test router
// @access  public(no need for token)
// router.get('/', auth, async (req, res) => {
//   try {
//     const { id } = req.user;
//     const user = await User.findById(id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(404).json({ msg: 'User not found' });
//   }
// });

// // @route   POST api/auth
// // @desc    Authenticate user & get token
// // @access  Public
// router.post(
//   '/',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists()
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//       // See if user exists
//       let user = await User.findOne({ email });

//       if (!user) {
//         return res
//           .status(404)
//           .json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         console.error('Invalid Credentials');
//         res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
//       }

//       // Return jsonwebtoken
//       const payload = {
//         user: {
//           id: user.id
//         }
//       };

//       jwt.sign(
//         payload,
//         config.get('jwtSecret'),
//         { expiresIn: 360000 },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

router.post('/', db.loginUser);
router.get('/', auth, db.getOneUser);

module.exports = router;
