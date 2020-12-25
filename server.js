const express = require('express')
const path = require('path')
const app = express()

// Init Middleware
app.use(express.json({ extended: false }))

// app.get('/', (req, res) => res.send('API running'))

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/massages', require('./routes/api/massages'))
app.use('/api/payments', require('./routes/api/payments'))
app.use('/api/bookings', require('./routes/api/bookings'))
app.use('/api/seed', require('./db/seed'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))