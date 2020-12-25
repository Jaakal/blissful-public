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
  BOOKING_ERROR } from '../actions/types'

const initialState = {
  massages: [],
  massage: null,
  bookingFormData: null,
  massageBookings: [],
  bookingInformation: {
    studioBodyTreatmentId: null,
    price: null
  },
  massageBooked: false,
  massageError: {},
  massageBookingsError: {},
  bookingError: {},
  loading: true,
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_MASSAGES:
      return {
        ...state,
        massages: payload,
        loading: false
      }
    case GET_MASSAGE:
      return {
        ...state,
        massage: payload[0],
        bookingFormData: payload.slice(1)
      }
    case RESET_MASSAGE:
      return {
        ...state,
        massage: null,
        bookingFormData: null,
        massageBookings: []
      }
    case MASSAGE_ERROR:
      return {
        ...state,
        massageError: payload,
        loading: false
      }
    case GET_MASSAGE_BOOKINGS:
      return {
        ...state,
        massageBookings: payload
      }
    case MASSAGE_BOOKINGS_ERROR:
      return {
        ...state,
        massageBookingsError: payload
      }
    case SET_BOOKING_INFORMATION:
      return {
        ...state,
        bookingInformation: payload
      }
    case RESET_BOOKING_INFORMATION:
      return {
        ...state,
        bookingInformation: {
          studioBodyTreatmentId: null,
          price: null
        },
        massageBooked: false
      }
    case BOOK_MASSAGE:
      return {
        ...state,
        massageBooked: true
      }
    case BOOKING_ERROR: {
      return {
        ...state,
        bookingError: payload
      }
    }
    default:
      return state;
  }
}

export default reducer