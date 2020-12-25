const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const db = require('../../db/index')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
   check('firstName', 'First name is required!').not().isEmpty(),
   check('lastName', 'Last name is required!').not().isEmpty(),
   check('email', 'Please include a valid email!').isEmail(),
   check('password', 'Please enter a password with 6 or more characters!').isLength({ min: 6 })
], async (req, res) => { 
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { firstName, lastName, email, password } = req.body
    const { rows } = await db.query(`SELECT * FROM "User" WHERE email = $1`, [email])

    if (rows.length === 0) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await db.query(`INSERT INTO "User" (first_name, last_name, email, password) VALUES($1, $2, $3, $4)`,
        [firstName, lastName, email, hashedPassword])

      const { rows } = await db.query(`SELECT * FROM "User" WHERE email = $1`, [email])
      
      const payload = {
        user: {
          id: rows[0].id
        }
      }

      jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err
          return res.json({ token })
        })
    } else {
      return res.status(400).json({
        errors: [{ msg: 'User with that email already exists!' }]
      })    
    } 
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

module.exports = router