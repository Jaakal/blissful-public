const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const db = require('../../db/index');

// @route   GET api/massages
// @desc    Get all the massages
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM "BodyTreatment"`);
    res.send(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   GET api/massages
// @desc    Get a massage
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const { rows: [massage] } = await db.query(`SELECT * FROM "BodyTreatment" WHERE name ILIKE $1`, [
      slug.replace(/-/g, ' '),
    ]);
    const { rows } = await db.query(`SELECT sb.id, studio_id, city, address, duration, price FROM "Studio" s INNER JOIN "Studio.BodyTreatment" sb ON s.id = sb.studio_id WHERE sb.body_treatment_id = $1 ORDER BY city ASC, address ASC, price ASC`, [
      massage.id,
    ]);

    const { id, name, description } = massage

    res.send([{ id, name, description }, ...rows]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST api/massages/bookings
// @desc    Get bookings
// @access  Private
router.post('/bookings', auth, [ 
  check('massageId', 'Massage ID is required!').exists(),
  check('studioId', 'Studio ID is required!').exists(),
  check('date', 'Date is required!').exists()
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const { massageId, studioId, date } = req.body

    const { rows } = await db.query(`SELECT start_time, duration FROM "Booking" INNER JOIN "Studio.BodyTreatment" sb ON studio_body_treatment_id = sb.id WHERE studio_body_treatment_id IN (SELECT id FROM "Studio.BodyTreatment" WHERE studio_id = $1 AND body_treatment_id = $2) AND date = $3`,
         [studioId, massageId, date])
    
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

// @route   POST api/massages
// @desc    Book a massage
// @access  Private
router.post('/', auth, [ 
  check('studioBodyTreatmentId', 'Studio body treatment ID is required!').exists(),
  check('date', 'Date is required!').exists() ,
  check('startTime', 'Start time is required!').exists() 
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const { studioBodyTreatmentId, date, startTime } = req.body

    await db.query(`INSERT INTO "Booking" (user_id, studio_body_treatment_id, date, start_time) VALUES($1, $2, $3, $4)`,
        [req.user.id, studioBodyTreatmentId, date, startTime])

    res.json({ msg: 'Massage Booked!' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error!')
  }
})

module.exports = router;
