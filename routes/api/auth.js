const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const db = require('../../db/index')
const { check, validationResult } = require('express-validator')

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT first_name, last_name, email FROM "User" WHERE id = $1`, [req.user.id])
    res.json(rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
  check('email', 'Please include a valid email!').isEmail(),
  check('password', 'Password is required!').exists(),
], async (req, res) => { 
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, password } = req.body
    const { rows } = await db.query(`SELECT * FROM "User" WHERE email = $1`, [email])
  
    if (rows.length === 0) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid credentials!' }]
      })
    }

    const isMatch = await bcrypt.compare(password, rows[0].password)

    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid credentials!' }]
      })
    }

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
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server error')
  }
})

module.exports = router