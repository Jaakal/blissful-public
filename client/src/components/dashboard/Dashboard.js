import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getUserBookings } from '../../actions/dashboard';

import Loader from '../layout/Loader';
import Request401 from '../error/Request401'

import '../../css/Dashboard.css'

const addToRefsArray = (refsArray, element) => {
  if (element && !refsArray.current.includes(element))
    refsArray.current.push(element)
}

const Dashboard = ({ getUserBookings, isAuthenticated, dashboard: { userBookings, loading } }) => {
  const upcomingBookingsRefs = useRef([])
  const passedBookingsRefs = useRef([])
  const activeBookingRef = useRef(null)
  
  const [bookings, setBookings] = useState({
    passedBookings: [],
    upcomingBookings: []
  })

  const { passedBookings, upcomingBookings } = bookings
  
  useEffect(() => {
    if (loading) getUserBookings() 
  }, [loading, getUserBookings])

  useEffect(() => {
    if (userBookings.length) {
      const currentDate = new Date()

      setBookings({
        passedBookings: userBookings.filter(booking => {
          const bookingDate = new Date(`${booking.date}T${booking.startTime}`)
          return bookingDate.getTime() < currentDate.getTime()
        }),
        upcomingBookings: userBookings.filter(booking => {
          const bookingDate = new Date(`${booking.date}T${booking.startTime}`)
          return bookingDate.getTime() >= currentDate.getTime()
        })
      })
    }
  }, [userBookings])

  const toggleBooking = (index, upcomingBooking) => {
    if (window.visualViewport.width > 700) return

    if (activeBookingRef.current?.upcomingBooking === upcomingBooking && activeBookingRef.current?.index === index) {
      const element = upcomingBooking ? upcomingBookingsRefs.current[index] : passedBookingsRefs.current[index]
      
      element.classList.remove('open')
      activeBookingRef.current = null
    } else if (activeBookingRef.current) {
      const elementToClose = activeBookingRef.current.upcomingBooking ? upcomingBookingsRefs.current[activeBookingRef.current.index] : passedBookingsRefs.current[activeBookingRef.current.index]
      const elementToOpen = upcomingBooking ? upcomingBookingsRefs.current[index] : passedBookingsRefs.current[index]

      elementToClose.classList.remove('open')
      elementToOpen.classList.add('open')
      
      activeBookingRef.current = {
        upcomingBooking,
        index
      }
    } else {
      const element = upcomingBooking ? upcomingBookingsRefs.current[index] : passedBookingsRefs.current[index]

      element.classList.add('open')
      
      activeBookingRef.current = {
        upcomingBooking,
        index
      }
    }
  }

  return loading ? (
    <Loader/>
  ) : (
    <>
      {(!isAuthenticated && isAuthenticated !== null) && <Request401/>}
      {isAuthenticated &&
        <div className="dashboard-container">
          {(upcomingBookings.length === 0) && <div className="headline">No Bookings</div>}
          {(upcomingBookings.length > 0) &&
            <>
              <div className="headline">Upcoming Bookings</div>
              <div className="upcoming-bookings">
                <div className="column-names">
                  <div className="name">Name</div>
                  <div className="booking-inner-wrapper">
                    <div className="city">City</div>
                    <div className="address">Address</div>
                    <div className="start-time">Time</div>
                    <div className="duration">Duration</div>
                  </div>
                  <div className="date">Date</div>
                </div>
                {upcomingBookings.map((booking, index) => 
                  <div className="booking" ref={(element) => addToRefsArray(upcomingBookingsRefs, element)} key={index}>
                    <div className="name" onClick={() => toggleBooking(index, true)}>
                      {booking.name}
                      <div className='arrow'/>
                    </div>
                    <div className="booking-inner-wrapper">
                      <div className="city">
                        <div className="description-wrapper">City</div>
                        {booking.city}
                      </div>
                      <div className="address">
                        <div className="description-wrapper">Address</div>
                        {booking.address}
                      </div>
                      <div className="start-time">
                        <div className="description-wrapper">Time</div>
                        {booking.startTime}
                      </div>
                      <div className="duration">
                        <div className="description-wrapper">Duration</div>
                        {`${booking.duration} min`}
                      </div>
                    </div>
                    <div className="date">{booking.date}</div>
                  </div>
                )}
              </div>
            </>
          }
          {(passedBookings.length > 0) &&
            <>
              <div className="headline">Passed Bookings</div>            
              <div className="passed-bookings">
                <div className="column-names">
                  <div className="name">Name</div>
                  <div className="booking-inner-wrapper">
                    <div className="city">City</div>
                    <div className="address">Address</div>
                    <div className="start-time">Time</div>
                    <div className="duration">Duration</div>
                  </div>
                  <div className="date">Date</div>
                </div>
                {passedBookings.map((booking, index) => 
                  <div className="booking"  ref={(element) => addToRefsArray(passedBookingsRefs, element)}  key={index}>
                    <div className="name" onClick={() => toggleBooking(index, false)}>
                      {booking.name}
                      <div className='arrow'/>
                    </div>
                    <div className="booking-inner-wrapper">
                      <div className="city">
                        <div className="description-wrapper">City</div>
                        {booking.city}
                      </div>
                      <div className="address">
                        <div className="description-wrapper">Address</div>
                        {booking.address}
                      </div>
                      <div className="start-time">
                        <div className="description-wrapper">Time</div>
                        {booking.startTime}
                      </div>
                      <div className="duration">
                        <div className="description-wrapper">Duration</div>
                        {`${booking.duration} min`}
                      </div>
                    </div>
                    <div className="date">{booking.date}</div>
                  </div>
                )}
              </div>
            </>
          }
        </div>
      }
    </>
  )
}

Dashboard.propTypes = {
  getUserBookings: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  dashboard: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  dashboard: state.dashboard
})

export default connect(mapStateToProps, { getUserBookings })(Dashboard)