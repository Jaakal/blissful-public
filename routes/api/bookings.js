const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

const db = require('../../db/index');

// @route   GET api/bookings
// @desc    Get user bookings
// @access  Private
router.get('/', auth, async (req, res) => {  
  try {
    const { rows } = await db.query(
      `SELECT b.date, b.start_time AS "startTime", sb.duration, s.city, s.address, bt.name FROM "User" u 
      INNER JOIN "Booking" b ON u.id = b.user_id INNER JOIN "Studio.BodyTreatment" sb 
      ON b.studio_body_treatment_id = sb.id INNER JOIN "Studio" s ON sb.studio_id = s.id 
      INNER JOIN "BodyTreatment" bt ON sb.body_treatment_id = bt.id WHERE u.id = $1 
      ORDER BY b.date ASC, s.city ASC, s.address ASC, sb.duration ASC, b.start_time ASC, bt.name ASC`, [req.user.id]);
    
    res.json(rows)
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
})

module.exports = router