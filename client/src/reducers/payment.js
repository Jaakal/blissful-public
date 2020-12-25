import {
  GET_STRIPE_CLIENT_SECRET,
  RESET_STRIPE_CLIENT_SECRET,
  STRIPE_ERROR,
  GET_COUNTRY_CODE,
  RESET_COUNTRY_CODE,
  COUNTRY_CODE_ERROR,
  PAYMENT_IN_PROCESS,
  PAYMENT_CONFIRMED,
  RESET_PAYMENT_INFORMATION } from '../actions/types'

const initialState = {
  stripeClientSecret: null,
  countryCode: null,
  paymentInProcess: false,
  paymentConfirmed: false
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_COUNTRY_CODE:
      return {
        ...state,
        countryCode: payload
      }
    case RESET_COUNTRY_CODE:
      return {
        ...state,
        countryCode: null
      }
    case COUNTRY_CODE_ERROR:
      return {
        ...state,
        countryCode: 'ERROR'
      }
    case GET_STRIPE_CLIENT_SECRET:
      return {
        ...state,
        stripeClientSecret: payload
      }
    case RESET_STRIPE_CLIENT_SECRET:
      return {
        ...state,
        stripeClientSecret: null
      }
    case STRIPE_ERROR:
      return state
    case PAYMENT_IN_PROCESS:
      return {
        ...state,
        paymentInProcess: payload
      }
    case PAYMENT_CONFIRMED:
      return {
        ...state,
        paymentConfirmed: payload
      }
    case RESET_PAYMENT_INFORMATION:
      return {
        ...state,
        paymentInProcess: false,
        paymentConfirmed: false
      }
    default:
      return state
  }
}

export default reducer