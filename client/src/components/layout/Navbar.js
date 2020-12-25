import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';

import { gsap } from 'gsap'

import { logout } from '../../actions/auth';

import '../../css/Navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const history = useHistory()
  const location = useLocation()
  
  const navbarRef = useRef(null)

  const [lastScrollPosition, setLastScrollPosition] = useState(0)

  const logoutClicked = event => {
    event.preventDefault()
    logout()

    if (location.pathname === '/dashboard')
      history.push('/massages')
  }

  const navbarScrollHandler = useCallback(() => {
    const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop

    if (currentScrollPosition === 0) {
      gsap.set(navbarRef.current, { borderBottom: 'none' })
    } else if (currentScrollPosition > 67) {
      if (navbarRef.current.style.position !== 'fixed')
        gsap.set(navbarRef.current, { position: 'fixed', top: -67, borderBottom: '1px solid #7e696e' })
        if (lastScrollPosition > currentScrollPosition) {
          gsap.set(navbarRef.current, { borderBottom: '1px solid #7e696e' })
          gsap.to(navbarRef.current, { y: 67, duration: 0.3, onComplete: () => {
            const newCurrentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop

            if (newCurrentScrollPosition === 0)
              gsap.set(navbarRef.current, { borderBottom: 'none' })
          } })
      } else if (lastScrollPosition < currentScrollPosition) {
        gsap.to(navbarRef.current, { y: -67, duration: 0.3 })
      }
    }

    setLastScrollPosition(currentScrollPosition)
  }, [lastScrollPosition ,setLastScrollPosition])

  const onResize = () => {
    const currentScrollPosition = document.body.scrollTop || document.documentElement.scrollTop

    if (currentScrollPosition === 0)
      gsap.set(navbarRef.current, { clearProps: 'all' })
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', navbarScrollHandler)
    return () => window.removeEventListener('scroll', navbarScrollHandler)
  }, [navbarScrollHandler])

  useEffect(() => {
    gsap.set(navbarRef.current, { clearProps: 'all' })
  }, [location.pathname])

  const guestLinks = (
    <>
      <li>
        <Link to='/register' className='navbar-link'>
          <div className='register-wrapper'>
            <div className='register-icon' />
          </div>
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login' className='navbar-link'>
          <div className='login-wrapper'>
            <div className='login-icon' />
          </div>
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </>)

  const authLinks = (
    <>
      <li>
        <Link to='/dashboard' className='navbar-link'>
          <div className='dashboard-wrapper'>
            <div className='dashboard-icon' />
          </div>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='#!' className='navbar-link' onClick={event => logoutClicked(event)}>
          <div className='logout-wrapper'>
            <div className='logout-icon' />
          </div>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>)

  return (
    <nav ref={navbarRef}>
      <h1 className='logo'>
        <Link to='/'>
          <div className="navbar-link">
            <div className="logo-wrapper"></div>
          </div>
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/massages' className='navbar-link'>
            <div className='massages-wrapper'>
              <div className='massages-icon' />
            </div>
            <span className='hide-sm'>Massages</span>
          </Link>
        </li>
        {!loading && (
          <>{isAuthenticated ? authLinks : guestLinks}</>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
