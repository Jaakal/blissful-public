import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

import {
  GET_USER_BOOKINGS,
  RESET_USER_BOOKINGS,
  USER_BOOKINGS_ERROR
} from './types'

axios.defaults.baseURL = window.location.origin

// Get massages
export const getUserBookings = () => async dispatch => {
  if (localStorage.token)
    setAuthToken(localStorage.token)

  try {
    const res = await axios.get('api/bookings')

    dispatch({
      type: GET_USER_BOOKINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USER_BOOKINGS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Reset user bookings
export const resetUserBookings = () => dispatch => {
  dispatch({
    type: RESET_USER_BOOKINGS
  })
}