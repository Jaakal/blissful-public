import axios from 'axios'

import {
  GET_STRIPE_CLIENT_SECRET,
  RESET_STRIPE_CLIENT_SECRET,
  STRIPE_ERROR,
  GET_COUNTRY_CODE,
  RESET_COUNTRY_CODE,
  COUNTRY_CODE_ERROR,
  PAYMENT_IN_PROCESS,
  PAYMENT_CONFIRMED, 
  RESET_PAYMENT_INFORMATION} from './types'

axios.defaults.baseURL = window.location.origin

export const getStripeClientSecret = studioBodyTreatmentId => async dispatch => {
  const config = {
    headers: {
      'Content-Type' : 'application/json'
    }
  }

  const body = JSON.stringify({
    studioBodyTreatmentId
  })

  try {
    const res = await axios.post('api/payments/stripe', body, config)

    dispatch({
      type: GET_STRIPE_CLIENT_SECRET,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: STRIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const resetStripeClientSecret = () => dispatch => {
  dispatch({
    type: RESET_STRIPE_CLIENT_SECRET
  })
}

export const getCountryCode = country => async dispatch => {
  try {
    const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://restcountries.eu/rest/v2/name/${country}`)
    
    dispatch({
      type: GET_COUNTRY_CODE,
      payload: res.data[0].alpha2Code
    })
  } catch (err) {
    console.log('Country ERROR', country)
    dispatch({
      type: COUNTRY_CODE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const resetCountryCode = () => dispatch => {
  dispatch({
    type: RESET_COUNTRY_CODE
  })
}

export const setPaymentInProcess = value => dispatch => {
  dispatch({
    type: PAYMENT_IN_PROCESS,
    payload: value
  })
}

export const setPaymentConfirmed = value => dispatch => {
  dispatch({
    type: PAYMENT_CONFIRMED,
    payload: value
  })
}

export const resetPaymentInformation = () => dispatch => {
  dispatch({
    type: RESET_PAYMENT_INFORMATION
  })
}



