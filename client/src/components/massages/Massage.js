import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getMassage,
  resetMassage,
  resetBookingInformation,
} from '../../actions/massage';
import { setPaymentConfirmed } from '../../actions/payment';

import BookingForm from './BookingForm';
import StripePayment from '../payment/StripePayment';
import PayPalPayment from '../payment/PayPalPayment';
import BitcoinPayment from '../payment/BitcoinPayment';
import BookingConfirmation from './BookingConfirmation';
import Loader from '../layout/Loader';

import '../../css/Massage.css';

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const Massage = ({
  getMassage,
  resetMassage,
  resetBookingInformation,
  massage: {
    massage,
    bookingInformation: { studioBodyTreatmentId, price },
    massageBooked,
  },
  auth: { isAuthenticated, loading },
  match,
}) => {
  const stripeButtonRef = useRef(null)
  const bitcoinButtonRef = useRef(null)

  const [displayBookingForm, setDisplayBookingForm] = useState(false);

  const setScrollPosition = useCallback(() => {
    if (studioBodyTreatmentId) {
      const paymentFormElement = document.getElementsByClassName('payment-form-wrapper')[0];

      if (paymentFormElement) {
        gsap.to(window, { duration: 1, scrollTo: { y: document.documentElement.scrollTop + paymentFormElement.getBoundingClientRect().top - 10 } })
      } else {
        setTimeout(setScrollPosition, 100);
      }
    } else {
      const bookingFormElement = document.getElementsByClassName('booking-form-wrapper')[0];

      if (bookingFormElement) {
        gsap.to(window, { duration: 1, scrollTo: { y: document.documentElement.scrollTop + bookingFormElement.getBoundingClientRect().top - 10 } })
      } else {
        setTimeout(setScrollPosition, 100);
      }
    }
  }, [studioBodyTreatmentId])

  const handleResize = useCallback(() => {
    if (stripeButtonRef.current !== null) {
      if (stripeButtonRef.current.getBoundingClientRect().width <= 300 && stripeButtonRef.current.className.split(' ').indexOf('stripe-button-shorter') === -1) {
        stripeButtonRef.current.classList.add('stripe-button-shorter');
      } else if (stripeButtonRef.current.getBoundingClientRect().width >= 300 && stripeButtonRef.current.className.split(' ').indexOf('stripe-button-shorter') !== -1) {
        stripeButtonRef.current.classList.remove('stripe-button-shorter');
      }
    }

    if (bitcoinButtonRef.current !== null) {
      if (bitcoinButtonRef.current.getBoundingClientRect().width <= 300 && bitcoinButtonRef.current.className.split(' ').indexOf('bitcoin-button-shorter') === -1) {
        bitcoinButtonRef.current.classList.add('bitcoin-button-shorter');
      } else if (bitcoinButtonRef.current.getBoundingClientRect().width >= 300 && bitcoinButtonRef.current.className.split(' ').indexOf('bitcoin-button-shorter') !== -1) {
        bitcoinButtonRef.current.classList.remove('bitcoin-button-shorter');
      }
    }

    if (stripeButtonRef.current === null || bitcoinButtonRef.current === null)
      setTimeout(handleResize, 100);
  }, [])

  const toggleBookingForm = useCallback(() => {
    if (!massageBooked)
      resetBookingInformation();
    
    setDisplayBookingForm(!displayBookingForm);
  }, [massageBooked, resetBookingInformation, setDisplayBookingForm, displayBookingForm])

  useEffect(() => {
    if (!massage) getMassage(match.params.slug);
  }, [massage, getMassage, match.params.slug]);

  useEffect(() => {
    return () => resetMassage()
  }, [resetMassage])

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [studioBodyTreatmentId, handleResize]);

  useEffect(() => {
    if (displayBookingForm) setScrollPosition();
  }, [displayBookingForm, studioBodyTreatmentId, setScrollPosition]);

  useEffect(() => {
    if ((massageBooked && displayBookingForm) || !isAuthenticated) 
      setDisplayBookingForm(false)

    if (!displayBookingForm)
      window.dispatchEvent(new Event('resize'))
  }, [isAuthenticated, massageBooked, displayBookingForm, toggleBookingForm]);

  const toggleBookingFormButton = (
    <button onClick={() => toggleBookingForm()} type='button' className='open-booking-form-button'>
      <div className='open-booking-form-button-inner-wrapper'>
        <span>Book Now</span>
        <span className={`close-sign${displayBookingForm ? ' close-sign-visible' : ''}`}>
          <span></span>
          <span></span>
        </span>
      </div>
    </button>
  );

  useEffect(() => {
  }, [massage, massageBooked])

  return !massage ? (
    <Loader/>
  ) : (
    <>
      {massageBooked && <BookingConfirmation/>}
      <div className='massage-wrapper'>
        <h1>{massage.name}</h1>
        {!loading && isAuthenticated && toggleBookingFormButton}
        <div className='description-wrapper' dangerouslySetInnerHTML={{ __html: massage.description }}></div>
        {!loading && isAuthenticated && toggleBookingFormButton}
        {(!loading && !isAuthenticated) &&
          <div className="login-notice">You'll need to be logged in for booking.</div>
        }
        <div className={`grand-form-wrapper${studioBodyTreatmentId && price ? '' : ' narrow'}`}>
          <span className='close-grand-form-button' onClick={() => toggleBookingForm()}>
            <span></span>
            <span></span>
          </span>
          {displayBookingForm && <BookingForm/>}
          {studioBodyTreatmentId && price && (
            <div className='payment-form-wrapper'>
              <StripePayment/>
              <PayPalPayment/>
              <BitcoinPayment/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Massage.propTypes = {
  getMassage: PropTypes.func.isRequired,
  resetMassage: PropTypes.func.isRequired,
  resetBookingInformation: PropTypes.func.isRequired,
  setPaymentConfirmed: PropTypes.func.isRequired,
  massage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  massage: state.massage,
  auth: state.auth,
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getMassage,
  resetMassage,
  resetBookingInformation,
  setPaymentConfirmed,
})(Massage);
