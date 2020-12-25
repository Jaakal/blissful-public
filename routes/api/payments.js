const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const config = require('config')
const { check, validationResult } = require('express-validator')
const stripe = require('stripe')(config.stripePrivateKey)

const db = require('../../db/index');

// @route   POST api/payments
// @desc    Get Stripe client secret
// @access  Private
router.post('/stripe', auth, [
  check('studioBodyTreatmentId', 'Body treatment error!').exists()
], async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { studioBodyTreatmentId } = req.body
    
    const { rows } = await db.query(`SELECT * FROM "Studio.BodyTreatment" WHERE id = $1`, [studioBodyTreatmentId]);
    
    if (rows.length === 0)
      throw `Body treatment with such ID doesn't exist!`
    
    const splitPrice = rows[0].price.split('.')
    const priceInCents = parseInt(splitPrice[0], 10) * 100 + parseInt(splitPrice[1], 10)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceInCents,
      currency: 'usd'
    })

    res.send(paymentIntent.client_secret)
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
})

module.exports = router