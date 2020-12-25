import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import Request400 from '../error/Request400'

import { register } from '../../actions/auth'
import { setAlert, flushAllAlerts } from '../../actions/alert'

import '../../css/Register.css'

const Register = ({ register, setAlert, isAuthenticated }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const { firstName, lastName, email, password, passwordConfirmation } = formData

  const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})

  const onSubmit = async event => {
    event.preventDefault()
    if (password !== passwordConfirmation) {
      setAlert('Passwords do not match!')
    } else {
      const response = await register(formData)
      if (response)
        history.push('/dashboard')
    }
  }

  return (
    <> 
      { isAuthenticated && <Request400/> }
      { (!isAuthenticated && isAuthenticated !== null) &&
      <div className="register-container">
        <form className="register-form" onSubmit={e => onSubmit(e)} >
          <h1 className="register-heading">Sign Up</h1>
          
          <div className="register-form-input-wrapper"> 
            <div className={`first-name-label floating-label${firstName.length > 0 ? ' input-exists' : ''}`}>First Name</div>
            <input id="firstName" placeholder="John" name="firstName" type="text" value={firstName} onChange={e => onChange(e)} />
          </div>
          
          <div className="register-form-input-wrapper"> 
            <div className={`last-name-label floating-label${lastName.length > 0 ? ' input-exists' : ''}`}>Last Name</div>
            <input id="lastName" placeholder="Doe" name="lastName" type="text" value={lastName} onChange={e => onChange(e)} />
          </div>

          <div className="register-form-input-wrapper"> 
            <div className={`email-label floating-label${email.length > 0 ? ' input-exists' : ''}`}>Email</div>
            <input id="email" placeholder="john.doe@gmail.com" name="email" type="text" value={email} onChange={e => onChange(e)} />
          </div>

          <div className="register-form-input-wrapper"> 
            <div className={`password-label floating-label${password.length > 0 ? ' input-exists' : ''}`}>Password</div>
            <input id="password" name="password" type="password" value={password} onChange={e => onChange(e)} />
          </div>
          
          <div className="register-form-input-wrapper"> 
            <div className={`password-confirmation-label floating-label${passwordConfirmation.length > 0 ? ' input-exists' : ''}`}>Password Confirmation</div>
            <input id="passwordConfirmation" name="passwordConfirmation" type="password" value={passwordConfirmation} onChange={e => onChange(e)} />
          </div>

          <div className="submit-button-wrapper">
            <button type='submit' className='submit-register-form-button'>Register</button>
          </div>
        </form>

        <div className="login-link-container">
          <span>Already have an account?&nbsp;</span>
          <div className="login-link-wrapper">
            <div className="place-filler">Sign In</div>
            <Link className="login-link" to='/login'>Sign In</Link>
          </div>
        </div>
      </div>}
    </>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  flushAllAlerts: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, setAlert, flushAllAlerts })(Register)
