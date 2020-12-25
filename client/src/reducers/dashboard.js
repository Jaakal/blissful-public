import {
  GET_USER_BOOKINGS,
  RESET_USER_BOOKINGS,
  USER_BOOKINGS_ERROR
} from '../actions/types'

const initialState = {
  userBookings: [],
  userBookingsError: {},
  loading: true
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_USER_BOOKINGS:
      return {
        ...state,
        userBookings: payload,
        loading: false
      }
    case RESET_USER_BOOKINGS:
      return {
        ...initialState
      }
    case USER_BOOKINGS_ERROR:
      return {
        ...state,
        userBookingsError: payload,
        loading: false
      }
    default:
      return state
  }
}

export default reducer