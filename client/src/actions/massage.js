import axios from 'axios'

import {
  GET_MASSAGES,
  GET_MASSAGE,
  RESET_MASSAGE,
  MASSAGE_ERROR,
  GET_MASSAGE_BOOKINGS,
  MASSAGE_BOOKINGS_ERROR,
  SET_BOOKING_INFORMATION,
  RESET_BOOKING_INFORMATION, 
  BOOK_MASSAGE,
  BOOKING_ERROR
} from './types'

axios.defaults.baseURL = window.location.origin

// Get massages
export const getMassages = () => async dispatch => {
  try {
    const res = await axios.get('api/massages')

    dispatch({
      type: GET_MASSAGES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MASSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get massage
export const getMassage = slug => async dispatch => {
  try {
    const res = await axios.get(`api/massages/${slug}`)

    dispatch({
      type: GET_MASSAGE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MASSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const resetMassage = () => dispatch => {
  dispatch({
    type: RESET_MASSAGE
  })
}

export const getMassageBookings = (massageId, studioId, date) => async dispatch => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  const body = JSON.stringify({ 
    massageId,
    studioId,
    date
  })

  try {
    const res = await axios.post('api/massages/bookings', body, config)

    dispatch({
      type: GET_MASSAGE_BOOKINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MASSAGE_BOOKINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const setBookingInformation = (value) => dispatch => {
  dispatch({
    type: SET_BOOKING_INFORMATION,
    payload: value
  })
}

export const resetBookingInformation = () => dispatch => {
  dispatch({
    type: RESET_BOOKING_INFORMATION
  })
}

export const bookMassage = ({ studioBodyTreatmentId, date, startTime }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  const body = JSON.stringify({ 
    studioBodyTreatmentId,
    date,
    startTime
  })

  try {
    const res = await axios.post('api/massages', body, config)

    dispatch({
      type: BOOK_MASSAGE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BOOKING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}