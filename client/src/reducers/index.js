import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import massage from './massage'
import payment from './payment'
import dashboard from './dashboard'

export default combineReducers({
  alert,
  auth,
  massage,
  payment,
  dashboard
})