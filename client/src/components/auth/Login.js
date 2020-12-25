import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import Request400 from '../error/Request400'

import { login } from '../../actions/auth'

import '../../css/Login.css'

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = event => setFormData({...formData, [event.target.name]: event.target.value})

  const onSubmit = async event => {
    event.preventDefault()
    const response = await login(email, password)

    if (response)
      history.push('/dashboard')
  }

  return (
    <>
      { isAuthenticated && <Request400/> }
      { (!isAuthenticated && isAuthenticated !== null) && 
      <div className="login-container">
        <form className="login-form" onSubmit={e => onSubmit(e)} >
          <h1 className="login-heading">Sign In</h1>
          
          <div className="login-form-input-wrapper"> 
            <div className={`email-label floating-label${email.length > 0 ? ' input-exists' : ''}`}>Email</div>
            <input id="email" placeholder="john.doe@gmail.com" name="email" type="text" value={email} onChange={e => onChange(e)} />
          </div>

          <div className="login-form-input-wrapper"> 
            <div className={`password-label floating-label${password.length > 0 ? ' input-exists' : ''}`}>Password</div>
            <input id="password" name="password" type="password" value={password} onChange={e => onChange(e)} />
          </div>

          <div className="submit-button-wrapper">
            <button type='submit' className='submit-login-form-button'>Login</button>
          </div>
        </form>

        <div className="register-link-container">
          <span>Don't have an account?&nbsp;</span>
          <div className="register-link-wrapper">
            <div className="place-filler">Sign Up</div>
            <Link className="register-link" to='/register'>Sign Up</Link>
          </div>
        </div>
      </div>}
    </>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
